"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";
import { Undo2 } from "lucide-react";
import React from "react";

const UndoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, onClick, children, ...props }, ref) => {
		const { editor } = useToolbar();

		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className={cn("h-8 w-8 p-0 sm:h-9 sm:w-9", className)}
						onMouseDown={(e) => {
							e.preventDefault();
							editor?.chain().undo().run();
						}}
						onClick={onClick}
						disabled={!editor?.can().chain().undo().run()}
						ref={ref}
						{...props}
					>
						{children ?? <Undo2 className="h-4 w-4" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>Undo</span>
				</TooltipContent>
			</Tooltip>
		);
	},
);

UndoToolbar.displayName = "UndoToolbar";

export { UndoToolbar };

