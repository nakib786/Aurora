// Type definitions for Three.js modules
declare module '@react-three/fiber' {
  export interface ThreeElements {
    mesh: any;
    primitive: any;
    group: any;
    // Add geometries
    boxGeometry: any;
    sphereGeometry: any;
    cylinderGeometry: any;
    extrudeGeometry: any;
    // Add materials
    meshStandardMaterial: any;
    meshBasicMaterial: any;
    lineBasicMaterial: any;
    // Add lights
    ambientLight: any;
    spotLight: any;
    pointLight: any;
    directionalLight: any;
    // Add misc
    instancedMesh: any;
    fog: any;
    lineSegments: any;
  }

  export interface ThreeState {
    camera: any;
    scene: any;
    raycaster: any;
    mouse: any;
    clock: any;
    gl: any;
    size: { width: number; height: number };
    viewport: {
      width: number;
      height: number;
      factor: number;
    };
  }

  export interface CanvasProps {
    children?: any;
    shadows?: boolean;
    camera?: any;
    gl?: any;
    pixelRatio?: number;
    onCreated?: (state: ThreeState) => void;
    dpr?: number;
    flat?: boolean;
    orthographic?: boolean;
    frameloop?: 'always' | 'demand' | 'never';
    linear?: boolean;
    legacy?: boolean;
    // OrbitControls props
    enablePan?: boolean;
    maxAzimuthAngle?: number;
    minAzimuthAngle?: number;
    maxPolarAngle?: number;
    minPolarAngle?: number;
    enableZoom?: boolean;
    // Any additional props
    [key: string]: any;
  }

  export function Canvas(props: CanvasProps): any;
  export function useFrame(callback: (state: ThreeState, delta: number) => void, priority?: number): void;
  export function useThree(): ThreeState;
  export function useLoader<T>(loader: any, url: string | string[]): T;
}

declare module '@react-three/drei' {
  export function OrbitControls(props?: any): any;
  export function PerspectiveCamera(props?: any): any;
  export function Environment(props?: any): any;
  export function Float(props?: any): any;
  export function Text(props?: any): any;
  export function PresentationControls(props?: any): any;
  export function ContactShadows(props?: any): any;
  export function MeshDistortMaterial(props?: any): any;
  export function Stars(props?: any): any;
  export function Cloud(props?: any): any;
  export function Html(props?: any): any;
  export function Trail(props?: any): any;
  export function Sphere(props?: any): any;
  
  export function useTexture(url: string | string[]): any;
}

// Augment the 'three' module
declare module 'three' {
  export class Shape {
    constructor();
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number): this;
  }

  export class CatmullRomCurve3 {
    constructor(points: Vector3[]);
    getPoint(t: number): Vector3;
    getPoints(divisions?: number): Vector3[];
  }

  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
    copy(v: Vector3): this;
    add(v: Vector3): this;
    sub(v: Vector3): this;
    multiplyScalar(s: number): this;
    normalize(): this;
  }

  export class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
  }

  export class Color {
    r: number;
    g: number;
    b: number;
    constructor(color?: number | string);
    set(color: number | string): this;
  }

  export class Euler {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
  }

  export class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    set(x: number, y: number, z: number, w: number): this;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    matrix: Matrix4;
    quaternion: Quaternion;
    updateMatrix(): void;
    updateMatrixWorld(force?: boolean): void;
    lookAt(vector: Vector3 | number, y?: number, z?: number): void;
  }

  export class Matrix4 {
    elements: number[];
    set(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number): this;
    makeRotationFromQuaternion(q: Quaternion): this;
    setPosition(x: number | Vector3, y?: number, z?: number): this;
    identity(): this;
    copy(m: Matrix4): this;
    compose(position: Vector3, quaternion: Quaternion, scale: Vector3): this;
  }

  export class Mesh extends Object3D {
    geometry: BufferGeometry;
    material: Material | Material[];
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
  }

  export class Camera extends Object3D {
    constructor();
  }

  export class Scene extends Object3D {
    constructor();
  }

  export class Raycaster {
    constructor();
  }

  export class WebGLRenderer {
    constructor(parameters?: any);
  }

  export class InstancedBufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number, normalized?: boolean);
  }

  export class InstancedMesh extends Mesh {
    instanceMatrix: InstancedBufferAttribute;
    count: number;
    setMatrixAt(index: number, matrix: Matrix4): void;
    getMatrixAt(index: number, matrix: Matrix4): void;
    instanceColor: InstancedBufferAttribute | null;
  }

  export class Clock {
    autoStart: boolean;
    startTime: number;
    oldTime: number;
    elapsedTime: number;
    running: boolean;
    constructor(autoStart?: boolean);
    start(): void;
    stop(): void;
    getElapsedTime(): number;
    getDelta(): number;
  }

  export class MathUtils {
    static clamp(value: number, min: number, max: number): number;
    static degToRad(degrees: number): number;
    static radToDeg(radians: number): number;
    static lerp(x: number, y: number, t: number): number;
    static smoothstep(x: number, min: number, max: number): number;
    static randInt(low: number, high: number): number;
    static randFloat(low: number, high: number): number;
  }

  export class BufferGeometry {
    attributes: {
      position: {
        count: number;
        getX(index: number): number;
        getY(index: number): number;
        getZ(index: number): number;
        setX(index: number, x: number): void;
        setY(index: number, y: number): void;
        setZ(index: number, z: number): void;
        setXYZ(index: number, x: number, y: number, z: number): void;
        needsUpdate: boolean;
      };
      [key: string]: any;
    };
  }

  export class Material {
    transparent: boolean;
    opacity: number;
    side: Side;
    visible: boolean;
    constructor();
  }

  export class MeshStandardMaterial extends Material {
    constructor(parameters?: MeshStandardMaterialParameters);
    color: Color;
    roughness: number;
    metalness: number;
    emissive: Color;
    emissiveIntensity: number;
    wireframe: boolean;
  }

  export class ShaderMaterial extends Material {
    constructor(parameters?: ShaderMaterialParameters);
    uniforms: { [uniform: string]: { value: any } };
    vertexShader: string;
    fragmentShader: string;
  }

  export interface MeshStandardMaterialParameters {
    color?: ColorRepresentation;
    roughness?: number;
    metalness?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    wireframe?: boolean;
    transparent?: boolean;
    opacity?: number;
    side?: Side;
  }

  export interface ShaderMaterialParameters {
    uniforms?: { [uniform: string]: { value: any } };
    vertexShader?: string;
    fragmentShader?: string;
    transparent?: boolean;
    side?: Side;
  }

  export type ColorRepresentation = Color | string | number;
  export type Side = 0 | 1 | 2;
}

// Add interface for JSX intrinsic elements
interface IntrinsicElements {
  mesh: any;
  group: any;
  primitive: any;
  boxGeometry: any;
  sphereGeometry: any;
  cylinderGeometry: any;
  extrudeGeometry: any;
  meshStandardMaterial: any;
  meshBasicMaterial: any;
  lineBasicMaterial: any;
  shaderMaterial: any;
  ambientLight: any;
  spotLight: any;
  pointLight: any;
  directionalLight: any;
  instancedMesh: any;
  fog: any;
  lineSegments: any;
  shape: any;
} 