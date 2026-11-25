// Pure geometry shared by the illustrations (kept apart so component files only export components).

// Deterministic pseudo-random so shapes never change between renders.
export function rand(seed: number) {
  const x = Math.sin(seed * 999.91) * 43758.5453
  return x - Math.floor(x)
}
