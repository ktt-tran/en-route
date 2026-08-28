import type { PlaceID } from "@/src/types/coordinates";

export interface Checkpoint {
    id: string;
    placeId: PlaceID;
    order: number;
}   