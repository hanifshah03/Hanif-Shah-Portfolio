import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  theme: 'dark' | 'light';
}

export default function ThreeCanvas({ theme }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true, // Transparent to let deep space background show
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isLight = theme === 'light';

    // Particle System 1: Starfield / Background Grid
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(isLight ? '#0891b2' : '#06b6d4'); // Cyan
    const color2 = new THREE.Color(isLight ? '#0369a1' : '#3b82f6'); // Blue / Ocean
    const color3 = new THREE.Color(isLight ? '#cbd5e1' : '#1e1b4b'); // Light gray / Deep indigo

    for (let i = 0; i < particleCount; i++) {
      // Create random points in a sphere or cube
      const r = Math.random() * 12 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Color interpolation
      const mixedColor = new THREE.Color();
      const pct = Math.random();
      if (pct < 0.5) {
        mixedColor.lerpColors(color1, color2, pct * 2);
      } else {
        mixedColor.lerpColors(color2, color3, (pct - 0.5) * 2);
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom point texture using a canvas-generated circular glow
    const createCircleTexture = () => {
      const size = 64;
      const pCanvas = document.createElement('canvas');
      pCanvas.width = size;
      pCanvas.height = size;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        // Glowing radial gradient
        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        if (isLight) {
          gradient.addColorStop(0, 'rgba(8, 145, 178, 1)'); // solid cyan
          gradient.addColorStop(0.3, 'rgba(14, 116, 144, 0.6)'); // cyan-700
          gradient.addColorStop(0.6, 'rgba(148, 163, 184, 0.15)'); // slate-400
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.2, 'rgba(6, 182, 212, 0.8)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const texture = createCircleTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Particle System 2: Floating Constellation Sphere / Node Cloud
    const nodeCount = 45;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeSpeeds: {x: number, y: number, z: number}[] = [];
    const sphereRadius = 3.5;

    for (let i = 0; i < nodeCount; i++) {
      // Distribute points on/inside a sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = sphereRadius * (0.8 + 0.2 * Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      // Small jitter speeds
      nodeSpeeds.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003
      });
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.25,
      color: isLight ? 0x0891b2 : 0x22d3ee, // Bright neon cyan vs dark cyan
      map: texture,
      transparent: true,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // Lines connecting nearby nodes to form a network grid
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isLight ? 0x0e7490 : 0x0891b2,
      transparent: true,
      opacity: isLight ? 0.22 : 0.15,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending
    });

    // We will dynamically update lines in the animation loop
    let lineGeometry = new THREE.BufferGeometry();
    let lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Orbital Cyber Rings
    const createRing = (radius: number, color: number, rotationX: number, rotationY: number) => {
      const ringGeom = new THREE.RingGeometry(radius, radius + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isLight ? 0.22 : 0.12,
        blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = rotationX;
      ringMesh.rotation.y = rotationY;
      return ringMesh;
    };

    const ring1 = createRing(4.0, isLight ? 0x0891b2 : 0x06b6d4, Math.PI / 2.5, Math.PI / 6);
    const ring2 = createRing(4.5, isLight ? 0x0369a1 : 0x3b82f6, -Math.PI / 3, -Math.PI / 4);
    scene.add(ring1);
    scene.add(ring2);

    // Lighting (Subtle)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 1, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse Tracking State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Tracking State for Parallax Depth
    const scrollState = { currentY: 0, targetY: 0 };
    const handleScroll = () => {
      scrollState.targetY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    let resizeAnimationFrameId: number;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeAnimationFrameId);
      resizeAnimationFrameId = requestAnimationFrame(() => {
        handleResize();
      });
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth scroll lerping
      scrollState.currentY += (scrollState.targetY - scrollState.currentY) * 0.08;
      const scrollOffset = scrollState.currentY * 0.002;

      // Parallax rotation & descent
      camera.position.x = mouse.x * 1.5;
      camera.position.y = mouse.y * 1.5 - scrollOffset * 0.3;
      camera.lookAt(scene.position);

      // Rotate background particles slowly, with scroll rotation influence
      particles.rotation.y = elapsedTime * 0.015 + scrollOffset * 0.03;
      particles.rotation.x = elapsedTime * 0.005 + scrollOffset * 0.01;

      // Apply independent vertical displacements for depth/parallax layers
      particles.position.y = scrollOffset * 0.5;
      nodes.position.y = scrollOffset * 0.9;
      ring1.position.y = scrollOffset * 0.7;
      ring2.position.y = scrollOffset * 0.7;

      // Rotate network grid and rings
      nodes.rotation.y = elapsedTime * 0.04;
      nodes.rotation.z = elapsedTime * 0.01;

      ring1.rotation.z = elapsedTime * 0.08;
      ring2.rotation.z = -elapsedTime * 0.05;

      // Update and jitter node positions slightly
      const positionsArr = nodes.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        positionsArr[i * 3] += nodeSpeeds[i].x;
        positionsArr[i * 3 + 1] += nodeSpeeds[i].y;
        positionsArr[i * 3 + 2] += nodeSpeeds[i].z;

        // Keep them bounded in our sphere
        const currentRadius = Math.sqrt(
          positionsArr[i * 3] ** 2 +
          positionsArr[i * 3 + 1] ** 2 +
          positionsArr[i * 3 + 2] ** 2
        );

        if (currentRadius > sphereRadius * 1.1 || currentRadius < sphereRadius * 0.7) {
          nodeSpeeds[i].x *= -1;
          nodeSpeeds[i].y *= -1;
          nodeSpeeds[i].z *= -1;
        }
      }
      nodes.geometry.attributes.position.needsUpdate = true;

      // Dynamically create lines between nearby nodes
      const linePositions: number[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const x1 = positionsArr[i * 3];
        const y1 = positionsArr[i * 3 + 1];
        const z1 = positionsArr[i * 3 + 2];

        for (let j = i + 1; j < nodeCount; j++) {
          const x2 = positionsArr[j * 3];
          const y2 = positionsArr[j * 3 + 1];
          const z2 = positionsArr[j * 3 + 2];

          // Calculate distance
          const dist = Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2);

          // If close enough, connect them
          if (dist < 1.8) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
          }
        }
      }

      // Recreate lines geometry
      scene.remove(lines);
      lineGeometry.dispose();
      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      lines.rotation.y = nodes.rotation.y;
      lines.rotation.z = nodes.rotation.z;
      scene.add(lines);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeAnimationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();

      // Dispose resources
      geometry.dispose();
      particleMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
