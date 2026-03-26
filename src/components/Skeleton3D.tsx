import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { bonesData } from '../data/bones';
import { useStore } from '../store/useStore';

// Region definitions for zoom functionality
export const bodyRegions = [
  { id: 'skull', name: '颅骨', nameEn: 'Skull', position: [0, 2.2, 0] as [number, number, number], zoom: 1.2 },
  { id: 'spine', name: '脊柱', nameEn: 'Spine', position: [0, 1.0, -0.3], zoom: 1.5 },
  { id: 'thorax', name: '胸廓', nameEn: 'Thorax', position: [0, 1.0, 0.3], zoom: 1.5 },
  { id: 'pelvis', name: '骨盆', nameEn: 'Pelvis', position: [0, 0.35, 0], zoom: 1.2 },
  { id: 'upper_limb_left', name: '左上肢', nameEn: 'Left Upper Limb', position: [-0.6, 1.0, 0], zoom: 1.0 },
  { id: 'upper_limb_right', name: '右上肢', nameEn: 'Right Upper Limb', position: [0.6, 1.0, 0], zoom: 1.0 },
  { id: 'lower_limb_left', name: '左下肢', nameEn: 'Left Lower Limb', position: [-0.2, -0.5, 0], zoom: 1.0 },
  { id: 'lower_limb_right', name: '右下肢', nameEn: 'Right Lower Limb', position: [0.2, -0.5, 0], zoom: 1.0 },
];

// Try to load external GLTF model
function GLTFSkeleton() {
  const { scene } = useGLTF('/models/skeleton.glb');
  const selectedBone = useStore((state) => state.selectedBone);
  const setSelectedBone = useStore((state) => state.setSelectedBone);

  // Clone scene to avoid modifying the original
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Traverse and add click handlers to all meshes
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.userData.isSkeletonPart = true;
        child.userData.originalMaterial = child.material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  // Update material based on selection
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (selectedBone) {
          // Highlight selected bone - simplified matching
          const meshName = child.name.toLowerCase();
          const boneId = selectedBone.id.toLowerCase();
          if (meshName.includes(boneId) || boneId.includes(meshName)) {
            (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('#FF6B6B');
            (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
          } else {
            (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('#000000');
            (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
          }
        } else {
          (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('#000000');
          (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        }
      }
    });
  }, [selectedBone, clonedScene]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    // Try to find matching bone based on mesh name
    const meshName = event.object.name.toLowerCase();
    const matchedBone = bonesData.find(b =>
      meshName.includes(b.id.toLowerCase()) ||
      b.id.toLowerCase().includes(meshName)
    );
    if (matchedBone) {
      setSelectedBone(matchedBone);
    }
  };

  return (
    <primitive
      object={clonedScene}
      onClick={handleClick}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

// Enhanced geometric skeleton with realistic bone shapes
function GeometricSkeleton() {
  const selectedBone = useStore((state) => state.selectedBone);
  const setSelectedBone = useStore((state) => state.setSelectedBone);
  const hoveredBoneId = useStore((state) => state.hoveredBoneId);
  const setHoveredBoneId = useStore((state) => state.setHoveredBoneId);

  // Bone material with realistic appearance
  const boneMaterial = useMemo(() => (
    <meshStandardMaterial color="#E8E4DE" roughness={0.65} metalness={0.05} />
  ), []);

  const selectedMaterial = useMemo(() => (
    <meshStandardMaterial color="#FF6B6B" roughness={0.5} metalness={0.1} emissive="#FF6B6B" emissiveIntensity={0.4} />
  ), []);

  const hoveredMaterial = useMemo(() => (
    <meshStandardMaterial color="#00A86B" roughness={0.5} metalness={0.1} emissive="#00A86B" emissiveIntensity={0.3} />
  ), []);

  return (
    <group>
      {/* Skull - Detailed */}
      <group position={[0, 2.2, 0]}>
        {/* Cranium - rounded skull */}
        <mesh onClick={() => setSelectedBone(bonesData.find(b => b.id === 'cranium')!)}
          onPointerOver={() => setHoveredBoneId('cranium')} onPointerOut={() => setHoveredBoneId(null)}>
          <sphereGeometry args={[0.18, 32, 32]} />
          {selectedBone?.id === 'cranium' ? selectedMaterial : hoveredBoneId === 'cranium' ? hoveredMaterial : boneMaterial}
        </mesh>
        {/* Face bones */}
        <mesh position={[0.08, -0.08, 0.1]} onClick={() => setSelectedBone(bonesData.find(b => b.id === 'maxilla')!)}
          onPointerOver={() => setHoveredBoneId('maxilla')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.1, 0.08, 0.06]} />
          {selectedBone?.id === 'maxilla' ? selectedMaterial : hoveredBoneId === 'maxilla' ? hoveredMaterial : boneMaterial}
        </mesh>
        <mesh position={[-0.08, -0.08, 0.1]} onClick={() => setSelectedBone(bonesData.find(b => b.id === 'maxilla')!)}
          onPointerOver={() => setHoveredBoneId('maxilla')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.1, 0.08, 0.06]} />
          {selectedBone?.id === 'maxilla' ? selectedMaterial : hoveredBoneId === 'maxilla' ? hoveredMaterial : boneMaterial}
        </mesh>
        {/* Mandible */}
        <mesh position={[0, -0.2, 0.08]} onClick={() => setSelectedBone(bonesData.find(b => b.id === 'mandible')!)}
          onPointerOver={() => setHoveredBoneId('mandible')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.14, 0.06, 0.05]} />
          {selectedBone?.id === 'mandible' ? selectedMaterial : hoveredBoneId === 'mandible' ? hoveredMaterial : boneMaterial}
        </mesh>
        {/* Eye sockets */}
        <mesh position={[0.06, -0.02, 0.14]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[-0.06, -0.02, 0.14]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        {/* Nasal bone */}
        <mesh position={[0, -0.05, 0.17]} onClick={() => setSelectedBone(bonesData.find(b => b.id === 'nasal-bone')!)}
          onPointerOver={() => setHoveredBoneId('nasal-bone')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.03, 0.04, 0.02]} />
          {selectedBone?.id === 'nasal-bone' ? selectedMaterial : hoveredBoneId === 'nasal-bone' ? hoveredMaterial : boneMaterial}
        </mesh>
      </group>

      {/* Cervical vertebrae */}
      {[0, 1, 2].map((i) => (
        <mesh key={`cervical-${i}`} position={[0, 1.72 - i * 0.06, -0.08]}
          onClick={() => setSelectedBone(bonesData.find(b => b.id === 'cervical-vertebra-c1')!)}
          onPointerOver={() => setHoveredBoneId('cervical-vertebra-c1')} onPointerOut={() => setHoveredBoneId(null)}>
          <cylinderGeometry args={[0.035, 0.04, 0.05, 16]} />
          {selectedBone?.id.includes('cervical') ? selectedMaterial : hoveredBoneId?.includes('cervical') ? hoveredMaterial : boneMaterial}
        </mesh>
      ))}

      {/* Thoracic vertebrae */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <mesh key={`thoracic-${i}`} position={[0, 1.35 - i * 0.06, -0.1]}
          onClick={() => setSelectedBone(bonesData.find(b => b.id === 'thoracic-vertebrae')!)}
          onPointerOver={() => setHoveredBoneId('thoracic-vertebrae')} onPointerOut={() => setHoveredBoneId(null)}>
          <cylinderGeometry args={[0.04, 0.045, 0.055, 16]} />
          {selectedBone?.id === 'thoracic-vertebrae' ? selectedMaterial : hoveredBoneId === 'thoracic-vertebrae' ? hoveredMaterial : boneMaterial}
        </mesh>
      ))}

      {/* Lumbar vertebrae */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={`lumbar-${i}`} position={[0, 0.72 - i * 0.08, -0.1]}
          onClick={() => setSelectedBone(bonesData.find(b => b.id === 'lumbar-vertebrae')!)}
          onPointerOver={() => setHoveredBoneId('lumbar-vertebrae')} onPointerOut={() => setHoveredBoneId(null)}>
          <cylinderGeometry args={[0.045, 0.05, 0.07, 16]} />
          {selectedBone?.id === 'lumbar-vertebrae' ? selectedMaterial : hoveredBoneId === 'lumbar-vertebrae' ? hoveredMaterial : boneMaterial}
        </mesh>
      ))}

      {/* Sacrum */}
      <mesh position={[0, 0.25, -0.08]} onClick={() => setSelectedBone(bonesData.find(b => b.id === 'sacrum')!)}
        onPointerOver={() => setHoveredBoneId('sacrum')} onPointerOut={() => setHoveredBoneId(null)}>
        <boxGeometry args={[0.12, 0.15, 0.08]} />
        {selectedBone?.id === 'sacrum' ? selectedMaterial : hoveredBoneId === 'sacrum' ? hoveredMaterial : boneMaterial}
      </mesh>

      {/* Sternum */}
      <group position={[0, 1.05, 0.16]}>
        <mesh onClick={() => setSelectedBone(bonesData.find(b => b.id === 'sternum-manubrium')!)}
          onPointerOver={() => setHoveredBoneId('sternum-manubrium')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.06, 0.12, 0.02]} />
          {selectedBone?.id.includes('sternum') ? selectedMaterial : hoveredBoneId?.includes('sternum') ? hoveredMaterial : boneMaterial}
        </mesh>
        <mesh position={[0, -0.12, 0]} onClick={() => setSelectedBone(bonesData.find(b => b.id === 'sternum-body')!)}
          onPointerOver={() => setHoveredBoneId('sternum-body')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.05, 0.2, 0.018]} />
          {selectedBone?.id === 'sternum-body' ? selectedMaterial : hoveredBoneId === 'sternum-body' ? hoveredMaterial : boneMaterial}
        </mesh>
        <mesh position={[0, -0.26, 0.02]} onClick={() => setSelectedBone(bonesData.find(b => b.id === 'xiphoid-process')!)}
          onPointerOver={() => setHoveredBoneId('xiphoid-process')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.025, 0.06, 0.015]} />
          {selectedBone?.id === 'xiphoid-process' ? selectedMaterial : hoveredBoneId === 'xiphoid-process' ? hoveredMaterial : boneMaterial}
        </mesh>
      </group>

      {/* Ribs - both sides */}
      {[-1, 1].map((side) => (
        <group key={`ribs-${side}`}>
          {/* True ribs (1-7) */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <mesh key={`true-rib-${i}`} position={[side * (0.08 + i * 0.04), 1.15 - i * 0.06, 0.08 - i * 0.01]}
              rotation={[0, 0, side * (0.3 + i * 0.05)]}
              onClick={() => setSelectedBone(bonesData.find(b => b.id === 'ribs-true')!)}
              onPointerOver={() => setHoveredBoneId('ribs-true')} onPointerOut={() => setHoveredBoneId(null)}>
              <boxGeometry args={[0.35 - i * 0.02, 0.025, 0.015]} />
              {selectedBone?.id.includes('ribs-true') ? selectedMaterial : hoveredBoneId?.includes('ribs-true') ? hoveredMaterial : boneMaterial}
            </mesh>
          ))}
          {/* False ribs (8-10) */}
          {[7, 8, 9].map((i) => (
            <mesh key={`false-rib-${i}`} position={[side * (0.35 + (i-7) * 0.04), 0.75 - i * 0.06, 0.02]}
              rotation={[0, 0, side * (0.6 + (i-7) * 0.05)]}
              onClick={() => setSelectedBone(bonesData.find(b => b.id === 'ribs-false')!)}
              onPointerOver={() => setHoveredBoneId('ribs-false')} onPointerOut={() => setHoveredBoneId(null)}>
              <boxGeometry args={[0.25, 0.02, 0.012]} />
              {selectedBone?.id === 'ribs-false' ? selectedMaterial : hoveredBoneId === 'ribs-false' ? hoveredMaterial : boneMaterial}
            </mesh>
          ))}
          {/* Floating ribs (11-12) */}
          {[10, 11].map((i) => (
            <mesh key={`floating-rib-${i}`} position={[side * (0.45 + (i-10) * 0.04), 0.5 - i * 0.06, -0.02]}
              rotation={[0, 0, side * (0.8)]}
              onClick={() => setSelectedBone(bonesData.find(b => b.id === 'ribs-floating')!)}
              onPointerOver={() => setHoveredBoneId('ribs-floating')} onPointerOut={() => setHoveredBoneId(null)}>
              <boxGeometry args={[0.12, 0.018, 0.01]} />
              {selectedBone?.id === 'ribs-floating' ? selectedMaterial : hoveredBoneId === 'ribs-floating' ? hoveredMaterial : boneMaterial}
            </mesh>
          ))}
        </group>
      ))}

      {/* Pelvis */}
      <group position={[0, 0.35, 0]}>
        {/* Ilium (hip bone) */}
        {[-1, 1].map((side) => (
          <mesh key={`ilium-${side}`} position={[side * 0.15, 0.05, 0]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'ilium')!)}
            onPointerOver={() => setHoveredBoneId('ilium')} onPointerOut={() => setHoveredBoneId(null)}>
            <boxGeometry args={[0.18, 0.12, 0.1]} />
            {selectedBone?.id === 'ilium' ? selectedMaterial : hoveredBoneId === 'ilium' ? hoveredMaterial : boneMaterial}
          </mesh>
        ))}
        {/* Pubis */}
        {[-1, 1].map((side) => (
          <mesh key={`pubis-${side}`} position={[side * 0.08, -0.08, 0.06]}
            rotation={[0.3, 0, 0]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'pubis')!)}
            onPointerOver={() => setHoveredBoneId('pubis')} onPointerOut={() => setHoveredBoneId(null)}>
            <boxGeometry args={[0.1, 0.08, 0.05]} />
            {selectedBone?.id === 'pubis' ? selectedMaterial : hoveredBoneId === 'pubis' ? hoveredMaterial : boneMaterial}
          </mesh>
        ))}
        {/* Ischium */}
        {[-1, 1].map((side) => (
          <mesh key={`ischium-${side}`} position={[side * 0.12, -0.1, -0.02]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'ischium')!)}
            onPointerOver={() => setHoveredBoneId('ischium')} onPointerOut={() => setHoveredBoneId(null)}>
            <boxGeometry args={[0.1, 0.08, 0.08]} />
            {selectedBone?.id === 'ischium' ? selectedMaterial : hoveredBoneId === 'ischium' ? hoveredMaterial : boneMaterial}
          </mesh>
        ))}
      </group>

      {/* Clavicle */}
      {[-1, 1].map((side) => (
        <mesh key={`clavicle-${side}`} position={[side * 0.2, 1.35, 0.12]} rotation={[0, 0, side * 0.15]}
          onClick={() => setSelectedBone(bonesData.find(b => b.id === 'clavicle')!)}
          onPointerOver={() => setHoveredBoneId('clavicle')} onPointerOut={() => setHoveredBoneId(null)}>
          <cylinderGeometry args={[0.018, 0.02, 0.35, 12]} />
          {selectedBone?.id === 'clavicle' ? selectedMaterial : hoveredBoneId === 'clavicle' ? hoveredMaterial : boneMaterial}
        </mesh>
      ))}

      {/* Scapula */}
      {[-1, 1].map((side) => (
        <mesh key={`scapula-${side}`} position={[side * 0.38, 1.22, -0.08]} rotation={[0, 0, side * 0.25]}
          onClick={() => setSelectedBone(bonesData.find(b => b.id === 'scapula')!)}
          onPointerOver={() => setHoveredBoneId('scapula')} onPointerOut={() => setHoveredBoneId(null)}>
          <boxGeometry args={[0.14, 0.18, 0.025]} />
          {selectedBone?.id === 'scapula' ? selectedMaterial : hoveredBoneId === 'scapula' ? hoveredMaterial : boneMaterial}
        </mesh>
      ))}

      {/* Arms - both sides */}
      {[-1, 1].map((side) => (
        <group key={`arm-${side}`}>
          {/* Humerus */}
          <mesh position={[side * 0.5, 1.0, 0]} rotation={[0, 0, side * 0.08]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'humerus')!)}
            onPointerOver={() => setHoveredBoneId('humerus')} onPointerOut={() => setHoveredBoneId(null)}>
            <capsuleGeometry args={[0.035, 0.4, 12, 16]} />
            {selectedBone?.id === 'humerus' ? selectedMaterial : hoveredBoneId === 'humerus' ? hoveredMaterial : boneMaterial}
          </mesh>

          {/* Radius */}
          <mesh position={[side * 0.6, 0.62, 0.03]} rotation={[0, 0, side * 0.05]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'radius')!)}
            onPointerOver={() => setHoveredBoneId('radius')} onPointerOut={() => setHoveredBoneId(null)}>
            <capsuleGeometry args={[0.022, 0.35, 12, 16]} />
            {selectedBone?.id === 'radius' ? selectedMaterial : hoveredBoneId === 'radius' ? hoveredMaterial : boneMaterial}
          </mesh>

          {/* Ulna */}
          <mesh position={[side * 0.6, 0.62, -0.03]} rotation={[0, 0, side * 0.05]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'ulna')!)}
            onPointerOver={() => setHoveredBoneId('ulna')} onPointerOut={() => setHoveredBoneId(null)}>
            <capsuleGeometry args={[0.02, 0.38, 12, 16]} />
            {selectedBone?.id === 'ulna' ? selectedMaterial : hoveredBoneId === 'ulna' ? hoveredMaterial : boneMaterial}
          </mesh>

          {/* Hand */}
          <mesh position={[side * 0.65, 0.32, 0]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'carpals')!)}
            onPointerOver={() => setHoveredBoneId('carpals')} onPointerOut={() => setHoveredBoneId(null)}>
            <boxGeometry args={[0.1, 0.14, 0.03]} />
            {selectedBone?.id.includes('carpal') ? selectedMaterial : hoveredBoneId?.includes('carpal') ? hoveredMaterial : boneMaterial}
          </mesh>
        </group>
      ))}

      {/* Legs - both sides */}
      {[-1, 1].map((side) => (
        <group key={`leg-${side}`}>
          {/* Femur */}
          <mesh position={[side * 0.18, -0.08, 0]} rotation={[0, 0, side * 0.02]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'femur')!)}
            onPointerOver={() => setHoveredBoneId('femur')} onPointerOut={() => setHoveredBoneId(null)}>
            <capsuleGeometry args={[0.045, 0.5, 12, 16]} />
            {selectedBone?.id === 'femur' ? selectedMaterial : hoveredBoneId === 'femur' ? hoveredMaterial : boneMaterial}
          </mesh>

          {/* Patella */}
          <mesh position={[side * 0.18, -0.38, 0.06]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'patella')!)}
            onPointerOver={() => setHoveredBoneId('patella')} onPointerOut={() => setHoveredBoneId(null)}>
            <sphereGeometry args={[0.045, 16, 16]} />
            {selectedBone?.id === 'patella' ? selectedMaterial : hoveredBoneId === 'patella' ? hoveredMaterial : boneMaterial}
          </mesh>

          {/* Tibia */}
          <mesh position={[side * 0.18, -0.7, 0.03]} rotation={[0, 0, side * 0.01]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'tibia')!)}
            onPointerOver={() => setHoveredBoneId('tibia')} onPointerOut={() => setHoveredBoneId(null)}>
            <capsuleGeometry args={[0.035, 0.5, 12, 16]} />
            {selectedBone?.id === 'tibia' ? selectedMaterial : hoveredBoneId === 'tibia' ? hoveredMaterial : boneMaterial}
          </mesh>

          {/* Fibula */}
          <mesh position={[side * 0.25, -0.7, -0.03]} rotation={[0, 0, side * 0.01]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'fibula')!)}
            onPointerOver={() => setHoveredBoneId('fibula')} onPointerOut={() => setHoveredBoneId(null)}>
            <capsuleGeometry args={[0.018, 0.52, 12, 16]} />
            {selectedBone?.id === 'fibula' ? selectedMaterial : hoveredBoneId === 'fibula' ? hoveredMaterial : boneMaterial}
          </mesh>

          {/* Foot */}
          <mesh position={[side * 0.18, -1.15, 0.05]} rotation={[-0.2, 0, 0]}
            onClick={() => setSelectedBone(bonesData.find(b => b.id === 'tarsals')!)}
            onPointerOver={() => setHoveredBoneId('tarsals')} onPointerOut={() => setHoveredBoneId(null)}>
            <boxGeometry args={[0.1, 0.25, 0.04]} />
            {selectedBone?.id.includes('tarsal') ? selectedMaterial : hoveredBoneId?.includes('tarsal') ? hoveredMaterial : boneMaterial}
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  const zoomTarget = useStore((state) => state.zoomTarget);
  const setZoomTarget = useStore((state) => state.setZoomTarget);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (zoomTarget && controlsRef.current) {
      const startPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
      const endPos = { x: zoomTarget.position[0], y: zoomTarget.position[1], z: zoomTarget.position[2] };
      const startTarget = { x: 0, y: 1, z: 0 };
      const endTarget = { x: zoomTarget.target[0], y: zoomTarget.target[1], z: zoomTarget.target[2] };
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        camera.position.x = startPos.x + (endPos.x - startPos.x) * eased;
        camera.position.y = startPos.y + (endPos.y - startPos.y) * eased;
        camera.position.z = startPos.z + (endPos.z - startPos.z) * eased;

        if (controlsRef.current) {
          const targetX = startTarget.x + (endTarget.x - startTarget.x) * eased;
          const targetY = startTarget.y + (endTarget.y - startTarget.y) * eased;
          const targetZ = startTarget.z + (endTarget.z - startTarget.z) * eased;
          controlsRef.current.target.set(targetX, targetY, targetZ);
          controlsRef.current.update();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setZoomTarget(null);
        }
      };
      animate();
    }
  }, [zoomTarget, camera, setZoomTarget]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={!zoomTarget}
      minDistance={0.5}
      maxDistance={8}
      target={[0, 1, 0]}
    />
  );
}

function RegionButtons() {
  const setZoomTarget = useStore((state) => state.setZoomTarget);
  const setSelectedBone = useStore((state) => state.setSelectedBone);

  const handleRegionClick = (region: typeof bodyRegions[0]) => {
    setSelectedBone(null);
    setZoomTarget({
      position: [region.position[0], region.position[1], region.zoom] as [number, number, number],
      target: region.position as [number, number, number]
    });
  };

  const handleResetView = () => {
    setSelectedBone(null);
    setZoomTarget({
      position: [0, 1, 3] as [number, number, number],
      target: [0, 1, 0] as [number, number, number]
    });
  };

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 mb-3">
        <div className="text-xs text-gray-500 mb-2 font-medium">快速跳转</div>
        <div className="grid grid-cols-4 gap-2">
          {bodyRegions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region)}
              className="px-2 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors"
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleResetView}
        className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 px-4 py-2 rounded-xl shadow-lg text-sm font-medium transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        返回全景
      </button>
    </div>
  );
}

export default function Skeleton3D() {
  const selectedBone = useStore((state) => state.selectedBone);
  const [useGLTF, setUseGLTF] = useState(false);
  const [gltfError, setGltfError] = useState(false);

  // Check if GLTF model exists and is valid
  useEffect(() => {
    const img = new Image();
    img.onload = () => setUseGLTF(true);
    img.onerror = () => setGltfError(true);
    img.src = '/models/skeleton.glb';
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-100 to-slate-200 relative">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => {
          useStore.getState().setSelectedBone(null);
        }}
      >
        <color attach="background" args={['#f1f5f9']} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <directionalLight position={[0, -5, 0]} intensity={0.2} />

        <Center>
          {useGLTF && !gltfError ? (
            <GLTFSkeleton />
          ) : (
            <GeometricSkeleton />
          )}
        </Center>

        <CameraController />
      </Canvas>

      <RegionButtons />

      {!selectedBone && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <p className="text-sm text-gray-600">
            点击骨骼查看词汇详情 · 拖拽旋转 · 滚轮缩放
          </p>
        </div>
      )}
    </div>
  );
}
