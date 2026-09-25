import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 420;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Nested Polyhedron Cores (Crystalline Engine)
    const outerGeo = new THREE.IcosahedronGeometry(4.8, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    rootGroup.add(outerMesh);

    const midGeo = new THREE.DodecahedronGeometry(3.2, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    rootGroup.add(midMesh);

    // Inner glowing core
    const innerGeo = new THREE.OctahedronGeometry(1.6, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 2. Orbital Gyro Rings (representing distributed replication rings)
    const ringGeo1 = new THREE.TorusGeometry(6.5, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(8.2, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.25 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    rootGroup.add(ring2);

    // 3. Vector Embedding Particle Nodes
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 7 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
    grad.addColorStop(0.7, 'rgba(99, 102, 241, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.7,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particleSystem);

    // 4. Dynamic Synapse Lines
    const maxLines = 180;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    rootGroup.add(lines);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.008;
      } else {
        targetRotationY = x * 0.7;
        targetRotationX = -y * 0.7;
      }

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      // Slow geometric rotations
      outerMesh.rotation.x = t * 0.12;
      outerMesh.rotation.y = t * 0.18;

      midMesh.rotation.x = -t * 0.2;
      midMesh.rotation.z = t * 0.15;

      innerMesh.rotation.y = t * 0.4;
      innerMesh.rotation.z = -t * 0.3;

      ring1.rotation.z = t * 0.1;
      ring2.rotation.x = -t * 0.08;

      // Mouse lerp damping
      if (!isDragging) {
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;
      }

      // Particle physics
      const posAttr = particleGeometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += particleVelocities[i].vx;
        posArray[i * 3 + 1] += particleVelocities[i].vy;
        posArray[i * 3 + 2] += particleVelocities[i].vz;

        const dist = Math.sqrt(
          posArray[i * 3] ** 2 +
          posArray[i * 3 + 1] ** 2 +
          posArray[i * 3 + 2] ** 2
        );

        if (dist > 14 || dist < 4) {
          particleVelocities[i].vx *= -1;
          particleVelocities[i].vy *= -1;
          particleVelocities[i].vz *= -1;
        }
      }
      posAttr.needsUpdate = true;

      // Dynamic connections between nearby vector points
      let lineSlot = 0;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 3.4 && lineSlot < maxLines * 6) {
            linePositions[lineSlot] = posArray[i * 3];
            linePositions[lineSlot + 1] = posArray[i * 3 + 1];
            linePositions[lineSlot + 2] = posArray[i * 3 + 2];

            lineColors[lineSlot] = 0.22;
            lineColors[lineSlot + 1] = 0.74;
            lineColors[lineSlot + 2] = 0.97;

            linePositions[lineSlot + 3] = posArray[j * 3];
            linePositions[lineSlot + 4] = posArray[j * 3 + 1];
            linePositions[lineSlot + 5] = posArray[j * 3 + 2];

            lineColors[lineSlot + 3] = 0.51;
            lineColors[lineSlot + 4] = 0.55;
            lineColors[lineSlot + 5] = 0.97;

            lineSlot += 6;
          }
        }
      }

      for (let k = lineSlot; k < maxLines * 6; k++) {
        linePositions[k] = 0;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div 
      className="three-card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="three-viewport" />
      
      {/* High-tech HUD telemetry overlays */}
      <div className="three-hud-top font-mono">
        <span className="hud-badge">VECTOR_SPACE_3D</span>
        <span className="hud-sub">140 Nodes • pgvector Cluster</span>
      </div>

      <div className="three-hud-bottom font-mono">
        <span className="hud-dot"></span>
        <span>Drag to rotate • Real-time WebGL</span>
      </div>

      <style>{`
        .three-card-wrapper {
          position: relative;
          width: 100%;
          height: 420px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: radial-gradient(circle at center, rgba(56, 189, 248, 0.08) 0%, rgba(17, 20, 28, 0.95) 75%);
          border: 1px solid var(--border-muted);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .three-card-wrapper:hover {
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 20px 45px -10px rgba(56, 189, 248, 0.15);
        }

        .three-viewport {
          width: 100%;
          height: 100%;
          cursor: grab;
        }

        .three-viewport:active {
          cursor: grabbing;
        }

        .three-hud-top {
          position: absolute;
          top: 14px;
          left: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }

        .hud-badge {
          font-size: 0.7rem;
          color: var(--accent-blue);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 2px 7px;
          border-radius: var(--radius-xs);
          letter-spacing: 0.06em;
          font-weight: 700;
        }

        .hud-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .three-hud-bottom {
          position: absolute;
          bottom: 14px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--text-muted);
          background: rgba(11, 13, 19, 0.75);
          backdrop-filter: blur(8px);
          padding: 3px 9px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-hairline);
          pointer-events: none;
        }

        .hud-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 6px var(--accent-emerald);
        }

        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
