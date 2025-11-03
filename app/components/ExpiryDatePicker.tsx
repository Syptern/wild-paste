'use client'
import React, { useState } from 'react';
import { Lock, Eye, CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

type ExpiryType = 'never' | '5min' | '15min' | '1hour' | '1day' | 'custom';

interface ExpiryDatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export function ExpiryDatePicker({ value, onChange }: ExpiryDatePickerProps) {
  const [selectedLabel, setSelectedLabel] = useState('Set expiry time');
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  const calculateExpiryDate = (option: ExpiryType): Date | null => {
    if (option === 'custom') return null;
    
    const now = new Date();
    switch (option) {
      case '5min':
        return new Date(now.getTime() + 5 * 60 * 1000);
      case '15min':
        return new Date(now.getTime() + 15 * 60 * 1000);
      case '1hour':
        return new Date(now.getTime() + 60 * 60 * 1000);
      case '1day':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      default:
        return null;
    }
  };

  const handleOptionSelect = (option: ExpiryType, label: string) => {
    if (option === 'custom') {
      setShowCustomPicker(true);
      setSelectedLabel('Custom');
    } else if (option === 'never') {
      onChange(null);
      setSelectedLabel(label);
    }
     else {
      setSelectedLabel("Expires in " + label);
      setShowCustomPicker(false);
      const expiryDate = calculateExpiryDate(option);
      onChange(expiryDate);
    }
  };

  return (
      <div className='inline'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem onClick={() => handleOptionSelect('never', 'No Expiry Date')}>
            Never
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOptionSelect('5min', '5 minutes')}>
            5 minutes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOptionSelect('15min', '15 minutes')}>
            15 minutes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOptionSelect('1hour', '1 hour')}>
            1 hour
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOptionSelect('1day', '1 day')}>
            1 day
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.preventDefault()
            setShowCustomPicker(true)
          }}>
             <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!customDate}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          Custom
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={customDate} onSelect={setCustomDate} />
      </PopoverContent>
    </Popover>
          </DropdownMenuItem>
     
    
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
  );
}
