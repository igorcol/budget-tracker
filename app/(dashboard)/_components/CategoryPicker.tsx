"use client"

import CreateCategoryDialog from '@/components/CreateCategoryDialog'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Category } from '@/lib/generated/prisma'
import { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

interface props {
  type: TransactionType
  onChange: (value: string) => void
}

const CategoryPicker = ({type, onChange}: props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () => fetch(`/api/categories?type=${type}`)
    .then(res => res.json())
  });

  useEffect(() => {
    if(!value) return
    onChange(value)
  }, [onChange, value])

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );

  const onSuccessCallback = useCallback((category: Category) => {
    setValue(category.name);
    setOpen(prev => !prev)
  }, [setValue, setOpen])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {selectedCategory ? <CategoryRow category={selectedCategory}/> : "Select Category" }
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50'/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command onSubmit={e => {e.preventDefault()}}>
          <CommandInput
            placeholder='Search Category...'
          />
          <CreateCategoryDialog type={type} successCallback={
            onSuccessCallback
          }/>
          <CommandEmpty>
            <p>Category Not Found</p>
            <p className='text-xs text-muted-foreground'>Tip: Create a new category</p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {
                categoriesQuery.data && categoriesQuery.data.map((category: Category) => (
                  <CommandItem key={category.name} onSelect={() => {
                    setValue(category.name)
                    setOpen(prev => !prev)
                  }}>
                    <CategoryRow category={category} />
                    <CheckIcon className={cn(
                      'mr-2 w-4 h-4 opacity-0',
                      value === category.name && "opacity-100"
                    )} />
                  </CommandItem>
                ))
              }
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CategoryRow({category}: {category: Category}) {
  return (
    <div className="flex items-center gap-2">
      <span role='img'>{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )
}

export default CategoryPicker
