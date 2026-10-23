import { useState, useEffect } from "react";

// High-quality Unsplash backup images if local files are missing
const FALLBACK_IMAGES: Record<string, string> = {
  exxonmobil: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
  edf: "https://images.unsplash.com/photo-1513828742140-ccaa34f32354?q=80&w=800&auto=format&fit=crop",
  lgcf: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
  danone: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
  totalenergies: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  "log-brewery": "https://images.unsplash.com/photo-1555529669-e69e7aa0db9a?q=80&w=600&auto=format&fit=crop",
  "six-sigma": "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=80&w=600&auto=format&fit=crop",
  junivers: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
  "strategy-bayer": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
  "mes-thales": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
};

interface SmartImageProps {
  projectId: string;
  initialSrc: string;
  alt: string;
  className?: string;
}

export default function SmartImage({ projectId, initialSrc, alt, className = "" }: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [attempt, setAttempt] = useState(0);

  // Synchronize state when target changes (e.g., in a popup or filter switch)
  useEffect(() => {
    setCurrentSrc(initialSrc);
    setAttempt(0);
  }, [initialSrc]);

  const handleError = () => {
    if (attempt === 0) {
      // Step 1: If .jpg failed, try loading .png (or vice-versa)
      if (initialSrc.endsWith(".jpg")) {
        setCurrentSrc(initialSrc.replace(".jpg", ".png"));
      } else if (initialSrc.endsWith(".png")) {
        setCurrentSrc(initialSrc.replace(".png", ".jpg"));
      } else {
        // Fall back directly if unexpected ending
        setCurrentSrc(FALLBACK_IMAGES[projectId] || "");
      }
      setAttempt(1);
    } else if (attempt === 1) {
      // Step 2: If neither format works locally, request the official Unsplash backup image
      setCurrentSrc(FALLBACK_IMAGES[projectId] || "");
      setAttempt(2);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}

export function SmartProfileImage({ alt, className = "" }: { alt: string; className?: string }) {
  const fileCandidates = [
    "/profile.jpg",
    "/profile.png",
    "/unnamed.jpg",
    "/avatar.jpg",
    "/avatar.png",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop"
  ];
  const [candidateIndex, setCandidateIndex] = useState(0);

  const handleError = () => {
    if (candidateIndex < fileCandidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  return (
    <img
      src={fileCandidates[candidateIndex]}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}

export function SmartCoverImage({ alt, className = "" }: { alt: string; className?: string }) {
  const fileCandidates = [
    "/banner.jpg",
    "/banner.png",
    "/cover.jpg",
    "/cover.png",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?h=600&w=1600&fit=crop&q=80"
  ];
  const [candidateIndex, setCandidateIndex] = useState(0);

  const handleError = () => {
    if (candidateIndex < fileCandidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  return (
    <img
      src={fileCandidates[candidateIndex]}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}

