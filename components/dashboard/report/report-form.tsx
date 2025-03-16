"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ReportForm({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [category, setCategory] = useState('');
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ category, complaint });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit a Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="cleanliness">Cleanliness</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Textarea
            placeholder="Describe your complaint..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            rows={4}
          />
          
          <Button type="submit" className="w-full">Submit Report</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}