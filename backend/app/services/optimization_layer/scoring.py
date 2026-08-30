DISTANCE_WEIGHT = 0.30
DURATION_WEIGHT = 0.70

def scoring(distance: float, duration: float) -> float:
    weighted_score = (distance * DISTANCE_WEIGHT) + (duration * DURATION_WEIGHT)
    
    return weighted_score