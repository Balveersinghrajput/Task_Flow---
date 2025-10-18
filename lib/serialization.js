// Super simple serialization - just use JSON
export function serializeForClient(data) {
  return JSON.parse(JSON.stringify(data));
}

// Simple date serialization
export function serializeDates(data) {
  return JSON.parse(JSON.stringify(data));
}

// Simple ultra serialize
export function ultraSerialize(data) {
  return JSON.parse(JSON.stringify(data));
}

// Simple nuclear serialize
export function nuclearSerialize(data) {
  return JSON.parse(JSON.stringify(data));
}
