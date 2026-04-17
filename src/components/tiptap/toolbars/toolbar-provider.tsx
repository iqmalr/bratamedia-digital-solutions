"use client";

import type { Editor } from "@tiptap/react";
import React from "react";

export interface ToolbarContextProps {
	editor: Editor;
}

export const ToolbarContext = React.createContext<ToolbarContextProps | null>(
	null,
);

interface ToolbarProviderProps {
	editor: Editor;
	children: React.ReactNode;
}

export const ToolbarProvider = ({ editor, children }: ToolbarProviderProps) => {
	// Force re-render on every editor transaction so toolbar buttons
	// (undo/redo disabled state, active formatting indicators) stay in sync.
	const [, setTick] = React.useState(0);

	React.useEffect(() => {
		const handler = () => setTick((t) => t + 1);
		editor.on("transaction", handler);
		return () => {
			editor.off("transaction", handler);
		};
	}, [editor]);

	return (
		<ToolbarContext.Provider value={{ editor }}>
			{children}
		</ToolbarContext.Provider>
	);
};

export const useToolbar = () => {
	const context = React.useContext(ToolbarContext);

	if (!context) {
		throw new Error("useToolbar must be used within a ToolbarProvider");
	}

	return context;
};
