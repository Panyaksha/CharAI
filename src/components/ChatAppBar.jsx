// components/ChatAppBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import ProtectedImage from "@/components/ProtectedImage";

const CONTACTS = [
  // ———— PROMOTED MEMBERS ————
  {
    id: "marsha",
    name: "Marsha Lenathea Lapian",
    avatar: "/avatars/marsha.png",
    status: "online",
    category: "promoted",
    generation: 8
  },
  {
    id: "delyn",
    name: "Adeline Wijaya",
    avatar: "/avatars/delynn.png",
    status: "online",
    category: "promoted",
    generation: 12
  },
];

const GENERATIONS = [
  { id: 'all', label: 'All Generations' },
  { id: '1', label: 'Generation 1' },
  { id: '2', label: 'Generation 2' },
  { id: '3', label: 'Generation 3' },
];

const ChatAppBar = () => {
  const [current, setCurrent] = useState(CONTACTS[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState('all');
  const dropdownRef = useRef(null);

  // Filter contacts based on search query and generation
  const filteredContacts = CONTACTS.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGeneration = selectedGeneration === 'all' || 
      contact.generation.toString() === selectedGeneration;
    return matchesSearch && matchesGeneration;
  });

  // Group contacts by category
  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    if (!acc[contact.category]) {
      acc[contact.category] = [];
    }
    acc[contact.category].push(contact);
    return acc;
  }, {});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center p-4 bg-white/5 backdrop-blur-lg border-b border-white/15 transition-all duration-300 hover:bg-white/10">
      {/* Current contact */}
      <div className="flex items-center flex-1 min-w-0">
        {/* Avatar with status indicator */}
        <div className="relative">
          <ProtectedImage
            src={current.avatar}
            alt={current.name}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-black/20 hover:ring-2 hover:ring-white/50 transition-all"
          />
          {current.status === "online" && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1f2c33]"></span>
          )}
        </div>

        {/* Name & status */}
        <div className="ml-3 flex flex-col overflow-hidden">
          <span className="text-sm font-semibold text-white truncate">{current.name}</span>
          {current.status && (
            <span className="text-xs text-gray-400">{current.status}</span>
          )}
        </div>
      </div>

      {/* Dropdown button with animation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change contact"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="ml-3 p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
      >
        <Icon 
          icon="mdi:chevron-down" 
          width="22" 
          height="22" 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Enhanced dropdown with generation filtering */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-3 top-16 w-72 rounded-lg bg-[#1f2c33] shadow-xl ring-1 ring-white/20 overflow-hidden animate-fade-in"
        >
          {/* Search bar */}
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Icon 
                icon="mdi:magnify" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                width="16" 
                height="16" 
              />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white/5 text-sm text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white/20 placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>

          {/* Generation filter */}
          <div className="px-3 py-2 border-b border-white/10 bg-white/5">
            <div className="flex space-x-1 overflow-x-auto pb-1 custom-scrollbar">
              {GENERATIONS.map((gen) => (
                <button
                  key={gen.id}
                  onClick={() => setSelectedGeneration(gen.id)}
                  className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                    selectedGeneration === gen.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {gen.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contacts list with scroll */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {Object.entries(groupedContacts).map(([category, contacts]) => (
              <div key={category}>
                <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider bg-white/5 sticky top-0">
                  {category === "promoted" ? "Promoted Members" : "Trainee"}
                </div>
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      setCurrent(contact);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-3 hover:bg-[#3b4a54] transition-colors ${
                      current.id === contact.id ? 'bg-[#3b4a54]' : ''
                    }`}
                  >
                    <div className="relative">
                      <ProtectedImage
                        src={contact.avatar}
                        alt={contact.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      {contact.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#1f2c33]"></span>
                      )}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{contact.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{contact.status}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                          Gen {contact.generation}
                        </span>
                      </div>
                    </div>
                    {current.id === contact.id && (
                      <Icon icon="mdi:check" className="text-blue-400" width="16" height="16" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatAppBar;