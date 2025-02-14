import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TrendingPerson {
  id: number;
  name: string;
  image: string;
}

const trendingPeople: TrendingPerson[] = [
  {
    id: 1,
    name: "Sarah Miller",
    image: "/placeholder-1.jpg"
  },
  {
    id: 2,
    name: "John Doe",
    image: "/placeholder-2.jpg"
  },
  {
    id: 3,
    name: "Emma Wilson",
    image: "/placeholder-3.jpg"
  },
  {
    id: 4,
    name: "Mike Chen",
    image: "/placeholder-4.jpg"
  },
  {
    id: 5,
    name: "Lisa Kumar",
    image: "/placeholder-5.jpg"
  },
  {
    id: 6,
    name: "Lisa Kumar",
    image: "/placeholder-5.jpg"
  },
  {
    id: 7,
    name: "Lisa Kumar",
    image: "/placeholder-5.jpg"
  }
];

export function TrendingSection() {
  return (
    <div className="py-3">
      <h2 className="text-lg font-semibold mb-4 px-4">This weeks trending</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex">
          {trendingPeople.map((person, index) => (
            <div 
              key={person.id} 
              className={`flex flex-col items-center ${index === 0 ? 'pl-4' : 'pl-3'} ${index !== trendingPeople.length - 1 ? 'pr-3' : 'pr-4'}`}
            >
              <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden mb-2">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Image</span>
                </div>
              </div>
              <span className="text-sm text-center">{person.name}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
