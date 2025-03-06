import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  User, 
  Heart, 
  Hospital, 
  Building2, 
  Calendar, 
  Shield, 
  Ambulance,
  Flame,
  Phone,
  HeartHandshake,
  Link
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const emergencyContacts = [
  { icon: Shield, title: "Police", contact: "100" },
  { icon: Ambulance, title: "Ambulance", contact: "108" },
  { icon: Phone, title: "Tourism Helpline", contact: "1800-425-4430" },
  { icon: HeartHandshake, title: "Women's Helpline", contact: "1091" },
  { icon: Flame, title: "Fire", contact: "101" },
];

const visitorInfo = [
  {
    title: "Hospitals",
    icon: Hospital,
    items: [
      "JIPMER Hospital - 0413-2272380",
      "Indira Gandhi Government Hospital - 0413-2224579",
      "Pondicherry Institute of Medical Sciences - 0413-2656271",
    ]
  },
  {
    title: "Tourist Offices",
    icon: Building2,
    items: [
      "Department of Tourism - 0413-2358333",
      "Tourist Information Center - 0413-2339497",
    ]
  },
  {
    title: "Important Dates",
    icon: Calendar,
    items: [
      "Pongal Festival - January",
      "International Yoga Day - June 21",
      "Bastille Day - July 14",
      "Independence Day - August 15",
    ]
  }
];

export function ProfileDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[85%] px-4">
        <DrawerHeader className="px-0 hidden">
          <DrawerTitle className="text-2xl font-bold">Profile</DrawerTitle>
        </DrawerHeader>
        
        <div className="space-y-4 overflow-y-auto h-[calc(100%-2rem)] pr-2 no-scrollbar">
          {/* Main Sections */}
          <div className="">
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Heart className="w-5 h-5" />
              <span>My Favorites</span>
            </div>
          </div>

          {/* Visitor Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Visitor Information</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {visitorInfo.map((info) => (
                <AccordionItem key={info.title} value={info.title} className="border rounded-lg">
                  <AccordionTrigger className="p-3 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <info.icon className="w-5 h-5" />
                      <span>{info.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 p-3">
                    <ul className="space-y-2">
                      {info.items.map((item, index) => (
                        <li key={index} className="text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Emergency Contacts</h3>
            <div className="grid grid-cols-2 gap-4">
              {emergencyContacts.map((contact) => {
                let bgColor = "bg-blue-50 hover:bg-blue-100";
                let iconColor = "text-blue-600";

                switch (contact.title) {
                  case "Police":
                    bgColor = "bg-indigo-50 hover:bg-indigo-100";
                    iconColor = "text-indigo-600";
                    break;
                  case "Ambulance":
                    bgColor = "bg-red-50 hover:bg-red-100";
                    iconColor = "text-red-600";
                    break;
                  case "Fire":
                    bgColor = "bg-orange-50 hover:bg-orange-100";
                    iconColor = "text-orange-600";
                    break;
                  case "Tourism Helpline":
                    bgColor = "bg-green-50 hover:bg-green-100";
                    iconColor = "text-green-600";
                    break;
                  case "Women's Helpline":
                    bgColor = "bg-purple-50 hover:bg-purple-100";
                    iconColor = "text-purple-600";
                    break;
                }

                return (
                  <div key={contact.title} className={`p-4 rounded-lg transition-colors ${bgColor}`}>
                    <div className="flex items-center space-x-3">
                      <contact.icon className={`w-6 h-6 ${iconColor}`} />
                      <div>
                        <p className="font-medium text-gray-900">{contact.title}</p>
                        <p className={`font-semibold ${iconColor}`}>{contact.contact}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Link className="w-5 h-5" />
              <a href="https://www.tourism.puducherry.gov.in/" target="_blank" rel="noopener noreferrer">
                Official Tourism Website
              </a>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}