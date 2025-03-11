"use client";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export const FavoriteButton = ({
  isFavorite,
  onToggle,
  className = "",
}: FavoriteButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full hover:bg-black/10 transition-colors ${className}`}
    >
      <Heart
        className={`w-6 h-6 ${isFavorite ? "fill-red-500 stroke-red-500" : ""}`}
      />
    </button>
  );
};