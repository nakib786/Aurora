declare module '@react-three/fiber' {
  import * as THREE from 'three';

  export type ThreeElements = any;

  export interface ThreeState {
    gl: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    invalidate: () => void;
    advance: (timestamp: number, runGlobalEffects?: boolean) => void;
    legacy: boolean;
    events: { connected: boolean };
    size: { width: number; height: number };
    viewport: {
      width: number;
      height: number;
      factor: number;
    };
    setEvents: (events: any) => void;
    mouse: THREE.Vector2;
    clock: THREE.Clock;
  }

  export function useFrame(
    callback: (state: ThreeState, delta: number) => void,
    renderPriority?: number
  ): void;

  export function useThree<T extends keyof ThreeState>(
    selector?: (state: ThreeState) => T extends keyof ThreeState ? ThreeState[T] : T
  ): T extends keyof ThreeState ? ThreeState[T] : T;

  export interface CanvasProps {
    children: any;
    camera?: Partial<THREE.PerspectiveCamera>;
    gl?: Partial<THREE.WebGLRenderer>;
    shadows?: boolean;
    scene?: THREE.Scene;
    legacy?: boolean;
    flat?: boolean;
    orthographic?: boolean;
    frameloop?: 'always' | 'demand' | 'never';
    resize?: {
      scroll?: boolean;
      debounce?: number | { scroll: number; resize: number };
    };
    dpr?: number | [min: number, max: number];
    raycaster?: Partial<THREE.Raycaster>;
    onCreated?: (state: ThreeState) => void;
    onPointerMissed?: (event: MouseEvent) => void;
    linear?: boolean;
    className?: string;
  }

  export function Canvas(props: CanvasProps): any;
}

declare module '@react-three/drei' {
  import * as THREE from 'three';
  
  export function useGLTF(path: string): {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
    scene: THREE.Group;
  };
  
  export function Environment(props: {
    preset?: string;
    background?: boolean;
    files?: string | string[];
    path?: string;
    scene?: THREE.Scene;
  }): JSX.Element;
  
  export function PresentationControls(props: {
    global?: boolean;
    snap?: boolean;
    speed?: number;
    zoom?: number;
    rotation?: [number, number, number];
    polar?: [number, number];
    azimuth?: [number, number];
    config?: any;
  }): JSX.Element;
  
  export function Float(props: {
    speed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
    children?: React.ReactNode;
  }): JSX.Element;
  
  export function Stars(props: {
    radius?: number;
    depth?: number;
    count?: number;
    factor?: number;
    saturation?: number;
    fade?: boolean;
    speed?: number;
  }): JSX.Element;

  export function Text(props: {
    anchorX?: 'left' | 'center' | 'right';
    anchorY?: 'top' | 'middle' | 'bottom';
    color?: string;
    fontSize?: number;
    font?: string;
    position?: [number, number, number];
    children?: React.ReactNode;
  }): JSX.Element;

  export function Html(props: {
    transform?: boolean;
    position?: [number, number, number];
    scale?: number | [number, number, number];
    className?: string;
    zIndexRange?: [number, number];
    children?: React.ReactNode;
  }): JSX.Element;
}

// Explicitly define JSX namespace for React Three Fiber components
declare namespace JSX {
  interface IntrinsicElements {
    // Base elements
    mesh: any;
    perspectiveCamera: any;
    group: any;
    
    // Geometries
    boxGeometry: any;
    sphereGeometry: any;
    planeGeometry: any;
    octahedronGeometry: any;
    cylinderGeometry: any;
    
    // Materials
    meshStandardMaterial: any;
    meshBasicMaterial: any;
    meshPhysicalMaterial: any;
    meshPhongMaterial: any;
    meshLambertMaterial: any;
    meshNormalMaterial: any;
    lineBasicMaterial: any;
    shaderMaterial: any;
    
    // Lights
    ambientLight: any;
    directionalLight: any;
    pointLight: any;
    spotLight: any;
    hemisphereLight: any;
    
    // Misc
    instancedMesh: any;
    lineSegments: any;
    primitive: any;
    fog: any;
    color: any;
  }
}

// Augment THREE types
declare module 'three' {
  interface ShaderMaterialParameters {
    uniforms?: Record<string, { value: any }>;
    fragmentShader?: string;
    vertexShader?: string;
  }

  export class Color {
    constructor(color?: string | number);
    r: number;
    g: number;
    b: number;
    set(color: string | number): Color;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): Vector3;
    copy(v: Vector3): Vector3;
    add(v: Vector3): Vector3;
  }

  export class Vector2 {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    set(x: number, y: number): Vector2;
  }

  export class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
    geometry: BufferGeometry;
    material: Material | Material[];
  }

  export class Group extends Object3D {}

  export abstract class Material {
    opacity: number;
    transparent: boolean;
    color: Color;
    emissive?: Color;
    emissiveIntensity?: number;
    metalness?: number;
    roughness?: number;
  }

  export abstract class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    up: Vector3;
    visible: boolean;
    parent: Object3D | null;
    matrix: Matrix4;
    updateMatrix(): void;
    lookAt(v: Vector3 | number, y?: number, z?: number): void;
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number, order?: string): Euler;
  }

  export class Matrix4 {
    elements: number[];
    
    makeScale(x: number, y: number, z: number): Matrix4;
    setPosition(x: number | Vector3, y?: number, z?: number): Matrix4;
    copy(m: Matrix4): this;
    multiply(m: Matrix4): this;
    identity(): this;
    transpose(): this;
    invert(): this;
  }

  export class InstancedMesh extends Mesh {
    instanceMatrix: {
      needsUpdate: boolean;
    };
    setMatrixAt(index: number, matrix: Matrix4): void;
    count: number;
  }

  export class Clock {
    getElapsedTime(): number;
    getDelta(): number;
  }

  export class MathUtils {
    static lerp(x: number, y: number, t: number): number;
  }

  export class BufferGeometry {
    attributes: {
      position: {
        setXYZ(index: number, x: number, y: number, z: number): void;
        needsUpdate: boolean;
      }
    }
    setFromPoints(points: Vector3[]): BufferGeometry;
  }

  export class LineSegments extends Object3D {
    geometry: BufferGeometry;
    material: Material;
  }

  export class MeshStandardMaterial extends Material {
    color: Color;
    metalness: number;
    roughness: number;
    emissive: Color;
    emissiveIntensity: number;
  }

  export class ShaderMaterial extends Material {
    uniforms: Record<string, { value: any }>;
    fragmentShader: string;
    vertexShader: string;
  }
} 