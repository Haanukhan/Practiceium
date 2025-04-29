"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write");

  return (
    <Tabs
      defaultValue="write"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="mb-2">
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write" className="mt-0">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your content in Markdown..."
          className="min-h-[400px] resize-y font-mono"
        />
      </TabsContent>
      <TabsContent value="preview" className="mt-0">
        <div className="border rounded-md p-4 min-h-[400px] prose prose-sm max-w-none">
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">Nothing to preview</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
