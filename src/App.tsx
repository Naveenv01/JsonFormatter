// JsonParserWithTabs.tsx
import React, { useState } from 'react';
import JsonFormatBox from './Jsonformatter';

interface TabProps {
  id: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = ({ id, setActiveTab, isActive }) => {
  return (
    <div
      className={`p-2 cursor-pointer ${isActive ? 'bg-gray-200 border rounded' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      Tab {id + 1}
    </div>
  );
};

interface SidebarProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  tabs: JSX.Element[];
  onNewTabClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, tabs, onNewTabClick }) => {
  return (
    <div className="w-1/6 bg-cyan-50 rounded border my-4 p-4">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          id={index}
          setActiveTab={setActiveTab}
          isActive={activeTab === index}
        />
      ))}
      <button
        onClick={onNewTabClick}
        className="mt-2 p-2 bg-green-500 text-white rounded"
      >
        New Tab
      </button>
    </div>
  );
};

const JsonParserWithTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<JSX.Element[]>([
    <JsonFormatBox key={0} initialJson="" />,
  ]);

  const handleNewTabClick = () => {
    setTabs([...tabs, <JsonFormatBox key={tabs.length} initialJson="" />]);
    setActiveTab(tabs.length);
  };

  return (
    <>
      <h1 className="text-3xl text-center">JSON Formatter</h1>
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
          onNewTabClick={handleNewTabClick}
        />
        <div className="flex-1">
          {tabs.map((tab, index) => (
            <div key={index} className={index === activeTab ? '' : 'hidden'}>
              {tab}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JsonParserWithTabs;
