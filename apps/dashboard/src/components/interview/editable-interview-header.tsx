"use client";

import { useInterviewMutation, useInterviewQuery } from "@hooks/use-interview";
import { Badge } from "@unstage/ui/components/badge";
import { useParams } from "next/navigation";
import { useRef } from "react";

export function EditableInterviewHeader() {
  const params = useParams();
  const interviewId = params.interviewId as string;
  const { data: interview } = useInterviewQuery(interviewId);
  const { mutate: updateInterview } = useInterviewMutation();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleTitleSave = () => {
    if (titleRef.current) {
      const newTitle = titleRef.current.textContent?.trim() || "";
      if (newTitle !== interview.title && newTitle !== "") {
        updateInterview({
          interviewId,
          title: newTitle,
        });
      } else {
        titleRef.current.textContent = interview.title;
      }
    }
    titleRef.current?.blur();
  };

  const handleDescriptionSave = () => {
    if (descriptionRef.current) {
      const newDescription = descriptionRef.current.textContent?.trim() || "";
      if (newDescription !== interview.description && newDescription !== "") {
        updateInterview({
          interviewId,
          description: newDescription,
        });
      } else {
        descriptionRef.current.textContent = interview.description;
      }
    }
    descriptionRef.current?.blur();
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTitleSave();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      if (titleRef.current) {
        titleRef.current.textContent = interview.title;
      }
    }
  };

  const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleDescriptionSave();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      if (descriptionRef.current) {
        descriptionRef.current.textContent = interview.description || "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <h1
          ref={titleRef}
          className="text-2xl font-bold font-display outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleSave}
          onKeyDown={handleTitleKeyDown}
          spellCheck={false}
        >
          {interview.title}
        </h1>
        <Badge className="capitalize bg-muted-foreground/20 text-muted-foreground">
          {interview.status}
        </Badge>
      </div>
      <p
        ref={descriptionRef}
        className="text-sm text-muted-foreground outline-none"
        contentEditable
        suppressContentEditableWarning
        onBlur={handleDescriptionSave}
        onKeyDown={handleDescriptionKeyDown}
        spellCheck={false}
      >
        {interview.description}
      </p>
    </div>
  );
}
