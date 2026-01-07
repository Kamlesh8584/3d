import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const carouselData = [
  { 
    id: 1, 
    title: "Day 1 Package", 
    subtitle: "Essential Coverage", 
    description: "Complete photography coverage for your special day", 
    color: "#4fc3f7", 
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
    details: {
      line1: "One Photographer",
      line2: "One Traditional Videographer",
      line3: "One Candid Photographer",
      line4: "One Cinematic Photographer"
    }
  },
  { 
    id: 2, 
    title: "Day 2 Package", 
    subtitle: "Premium Coverage", 
    description: "Enhanced coverage with aerial cinematography", 
    color: "#ab47bc", 
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
    details: {
      line1: "One Photographer",
      line2: "One Traditional Videographer",
      line3: "One Candid Photographer",
      line4: "One Cinematic Photographer",
      line5: "Drone Shoot"
    }
  },
  { 
    id: 3, 
    title: "Day 3 Package", 
    subtitle: "Deluxe Coverage", 
    description: "Complete premium package with drone cinematography", 
    color: "#26a69a", 
    imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=400&fit=crop",
    details: {
      line1: "One Photographer",
      line2: "One Traditional Videographer",
      line3: "One Candid Photographer",
      line4: "One Cinematic Photographer",
      line5: "Drone Shoot"
    }
  },
];

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    background: '#000000',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 3rem',
  },
  logo: {
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    color: 'white',
    fontSize: '0.875rem',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    transition: 'color 0.3s',
    fontSize: '0.875rem',
  },
  subscribeButton: {
    background: 'white',
    color: '#000000',
    padding: '0.5rem 1.5rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    marginBottom: '8rem',
  },
  subtitle: {
    color: '#4fc3f7',
    fontSize: '0.875rem',
    letterSpacing: '0.2em',
    marginBottom: '1rem',
  },
  title: {
    color: 'white',
    fontSize: '4.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
    margin: '0 0 1.5rem 0',
    textShadow: '0 0 20px rgba(79, 195, 247, 0.5)',
  },
  description: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    maxWidth: '42rem',
    margin: '0 auto 2rem',
    lineHeight: '1.6',
    padding: '0 1rem',
  },
  exploreButton: {
    pointerEvents: 'auto',
    background: 'white',
    color: '#000000',
    padding: '0.75rem 2rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
  },
  navPrev: {
    position: 'absolute',
    left: '3rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    color: 'white',
    fontSize: '1rem',
    letterSpacing: '0.2em',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 1.5rem',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  navNext: {
    position: 'absolute',
    right: '3rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    color: 'white',
    fontSize: '1rem',
    letterSpacing: '0.2em',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 1.5rem',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  indicators: {
    position: 'absolute',
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 20,
  },
  indicator: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '9999px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s',
    padding: 0,
  },
  indicatorActive: {
    width: '2rem',
    background: '#4fc3f7',
    boxShadow: '0 0 20px rgba(79, 195, 247, 1)',
    border: '1px solid #4fc3f7',
  },
  indicatorInactive: {
    background: 'rgba(255, 255, 255, 0.3)',
  },
  filmGrain: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
    pointerEvents: 'none',
    opacity: 0.3,
    mixBlendMode: 'overlay',
    zIndex: 100,
  },
  vignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)',
    pointerEvents: 'none',
    zIndex: 5,
  },
};

// Add keyframes
const styleSheet = document.styleSheets[0];
const keyframesSlideIn = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(30px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0);
    }
  }
`;
if (styleSheet) {
  try {
    styleSheet.insertRule(keyframesSlideIn, styleSheet.cssRules.length);
  } catch (e) {
    // Ignore if already exists
  }
}

function App() {
  const mountRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshesRef = useRef([]);
  const groupRef = useRef(null);
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const spotLightRef = useRef(null);
  const cameraAngleRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [flippedCards, setFlippedCards] = useState({});
  const [focusedCard, setFocusedCard] = useState(null);

  const activeItem = carouselData[activeIndex];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 5, 20);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Dynamic spotlight that follows active object
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = 0.5;
    spotLight.penumbra = 0.8;
    spotLight.decay = 1;
    spotLight.distance = 30;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    // Rim lights for cinematic effect
    const rimLight1 = new THREE.DirectionalLight(0x4fc3f7, 0.5);
    rimLight1.position.set(-5, 2, -5);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xab47bc, 0.5);
    rimLight2.position.set(5, 2, -5);
    scene.add(rimLight2);

    // Create environment - floor grid
    const gridHelper = new THREE.GridHelper(50, 50, 0x333333, 0x111111);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Add floating particles for atmosphere
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create carousel group
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Create meshes - Double-sided Image Cards
    const radius = 5;
    const meshes = [];

    carouselData.forEach((item, index) => {
      const scale = 1.5; // Reduced size for all cards

      // Create a group for each card
      const cardGroup = new THREE.Group();
      cardGroup.userData = { 
        index, 
        baseScale: scale,
        targetFlipRotation: 0,
        currentFlipRotation: 0
      };

      // FRONT SIDE - Image
      const frontGeometry = new THREE.PlaneGeometry(2 * scale, 2.5 * scale);
      
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = "anonymous";
      
      const frontMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.4,
        emissive: new THREE.Color(item.color),
        emissiveIntensity: 0.1,
        side: THREE.FrontSide,
      });
      
      const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
      frontMesh.castShadow = true;
      frontMesh.receiveShadow = true;
      
      // Load the image texture
      textureLoader.load(
        item.imageUrl,
        (texture) => {
          frontMaterial.map = texture;
          frontMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Error loading texture:', error);
        }
      );

      cardGroup.add(frontMesh);

      // BACK SIDE - Text Details
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 640;
      const ctx = canvas.getContext('2d');
      
      // Draw background with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, item.color);
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
      
      // Draw title - LARGER AND BOLD WHITE TEXT
      ctx.fillStyle = 'white';
      ctx.font = 'bold 56px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.title, canvas.width / 2, 100);
      
      // Draw subtitle - WHITE TEXT
      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(item.subtitle, canvas.width / 2, 160);
      
      // Draw separator line
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(80, 200);
      ctx.lineTo(canvas.width - 80, 200);
      ctx.stroke();
      
      // Draw details - LARGER WHITE TEXT
      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      const startY = 260;
      const lineHeight = 58;
      
      ctx.fillText('• ' + item.details.line1, 60, startY);
      ctx.fillText('• ' + item.details.line2, 60, startY + lineHeight);
      ctx.fillText('• ' + item.details.line3, 60, startY + lineHeight * 2);
      ctx.fillText('• ' + item.details.line4, 60, startY + lineHeight * 3);
      if (item.details.line5) {
        ctx.fillText('• ' + item.details.line5, 60, startY + lineHeight * 4);
      }
      
      // Draw "Click to flip" hint - WHITE TEXT
      ctx.font = 'italic 28px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Click card to flip back', canvas.width / 2, canvas.height - 50);
      
      const backTexture = new THREE.CanvasTexture(canvas);
      const backGeometry = new THREE.PlaneGeometry(2 * scale, 2.5 * scale);
      const backMaterial = new THREE.MeshStandardMaterial({ 
        map: backTexture, 
        side: THREE.BackSide,
        emissive: new THREE.Color(item.color),
        emissiveIntensity: 0.1,
      });
      const backMesh = new THREE.Mesh(backGeometry, backMaterial);
      backMesh.castShadow = true;
      backMesh.receiveShadow = true;
      
      cardGroup.add(backMesh);
      
      const angle = (index / carouselData.length) * Math.PI * 2;
      cardGroup.position.x = Math.sin(angle) * radius;
      cardGroup.position.z = Math.cos(angle) * radius;
      
      group.add(cardGroup);
      meshes.push(cardGroup);
    });

    meshesRef.current = meshes;

    // Mouse click for card flip
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      const allMeshes = [];
      meshes.forEach(cardGroup => {
        cardGroup.children.forEach(child => allMeshes.push(child));
      });
      
      const intersects = raycaster.intersectObjects(allMeshes);
      
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const parentCard = clickedMesh.parent;
        const cardIndex = parentCard.userData.index;
        
        const wasFlipped = flippedCards[cardIndex];
        
        setFlippedCards(prev => ({
          ...prev,
          [cardIndex]: !prev[cardIndex]
        }));
        
        // Set focused card when flipping to details
        if (!wasFlipped) {
          setFocusedCard(cardIndex);
        } else {
          setFocusedCard(null);
        }
      }
    };
    
    window.addEventListener('click', handleClick);
    
    // Mouse move for parallax
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate individual cards slightly
      meshes.forEach((cardGroup, index) => {
        const isFlipped = flippedCards[index];
        const isFocused = focusedCard === index;
        
        // Target scale
        let targetScale;
        if (isFocused) {
          targetScale = 6; // Large enough to fill screen width
        } else {
          targetScale = 2; // Same size for all cards
        }
        
        const currentScale = cardGroup.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.08;
        cardGroup.scale.set(newScale, newScale, newScale);
        
        // Target position and rotation
        if (isFocused) {
          // Position card on the floor grid, centered
          const targetPos = new THREE.Vector3(0, -1, 3); // Lower position, on the grid
          cardGroup.position.lerp(targetPos, 0.1);
          
          // Create the tilted perspective look from the image
          cardGroup.rotation.x = -0.3; // Tilt back to rest on floor
          cardGroup.rotation.y = Math.PI; // Flipped to show back
          cardGroup.rotation.z = 0;
          
          // Make sure it's fully visible
          if (cardGroup.children[0] && cardGroup.children[0].material) {
            cardGroup.children[0].material.opacity = 1;
            cardGroup.children[0].material.transparent = true;
          }
          if (cardGroup.children[1] && cardGroup.children[1].material) {
            cardGroup.children[1].material.opacity = 1;
            cardGroup.children[1].material.transparent = true;
          }
        } else {
          // Normal carousel behavior
          const angle = (index / carouselData.length) * Math.PI * 2;
          const targetX = Math.sin(angle) * radius;
          const targetZ = Math.cos(angle) * radius;
          const targetPos = new THREE.Vector3(targetX, 0, targetZ);
          
          cardGroup.position.lerp(targetPos, 0.08);
          
          // Auto rotate slightly only when NOT flipped
          if (!isFlipped) {
            cardGroup.rotation.y += 0.002;
          } else {
            // If flipped but not focused, keep current rotation
            // Apply flip rotation
            cardGroup.userData.targetFlipRotation = Math.PI;
            
            // Smooth flip animation
            const flipDiff = cardGroup.userData.targetFlipRotation - cardGroup.userData.currentFlipRotation;
            cardGroup.userData.currentFlipRotation += flipDiff * 0.1;
            
            cardGroup.rotation.y = cardGroup.userData.currentFlipRotation;
          }
          
          // Dim cards when one is focused
          if (focusedCard !== null && !isFocused) {
            if (cardGroup.children[0] && cardGroup.children[0].material) {
              const targetOpacity = 0.3;
              if (cardGroup.children[0].material.opacity === undefined) {
                cardGroup.children[0].material.opacity = 1;
              }
              cardGroup.children[0].material.transparent = true;
              cardGroup.children[0].material.opacity += (targetOpacity - cardGroup.children[0].material.opacity) * 0.05;
            }
          } else {
            if (cardGroup.children[0] && cardGroup.children[0].material && cardGroup.children[0].material.opacity !== undefined) {
              cardGroup.children[0].material.opacity += (1 - cardGroup.children[0].material.opacity) * 0.05;
            }
          }
        }
        
        // Update emissive intensity for active object
        if (cardGroup.children && cardGroup.children[0] && cardGroup.children[0].material && cardGroup.children[0].material.emissiveIntensity !== undefined) {
          const targetEmissive = (index === activeIndex || isFocused) ? 0.4 : 0.1;
          const currentEmissive = cardGroup.children[0].material.emissiveIntensity;
          cardGroup.children[0].material.emissiveIntensity = currentEmissive + (targetEmissive - currentEmissive) * 0.05;
        }
      });

      // Smooth rotation of group
      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.05;
      group.rotation.y = currentRotationRef.current;

      // Orbital camera rotation - DISABLED
      // cameraAngleRef.current += 0.001;
      // const cameraRadius = 10;
      // camera.position.x = Math.sin(cameraAngleRef.current) * cameraRadius * 0.3;
      // camera.position.z = Math.cos(cameraAngleRef.current) * cameraRadius;
      
      // Static camera position with parallax only
      camera.position.x = 0 + mouseRef.current.x * 0.5;
      camera.position.y = 3 + mouseRef.current.y * 0.5;
      camera.position.z = 10;
      
      camera.lookAt(0, 0, 0);

      // Update scales based on active index with smooth transitions
      meshes.forEach((mesh, index) => {
        const isFocused = focusedCard === index;
        
        if (!isFocused) {
          const targetScale = 2; // Same size for all
          const currentScale = mesh.scale.x;
          const newScale = currentScale + (targetScale - currentScale) * 0.05;
          mesh.scale.set(newScale, newScale, newScale);
        }
      });

      // Spotlight follows active object
      if (meshes[activeIndex] && spotLightRef.current) {
        const activePos = meshes[activeIndex].getWorldPosition(new THREE.Vector3());
        spotLightRef.current.target.position.copy(activePos);
        spotLightRef.current.target.updateMatrixWorld();
      }

      // Animate particles
      particlesMesh.rotation.y += 0.0002;
      
      const positions = particlesMesh.geometry.attributes.position.array;
      for(let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.01;
        if(positions[i] < -25) {
          positions[i] = 25;
        }
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      meshes.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        // Dispose child meshes
        mesh.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [activeIndex, flippedCards, focusedCard]);

  // Update target rotation when active index changes
  useEffect(() => {
    targetRotationRef.current = -(activeIndex * (Math.PI * 2 / carouselData.length));
  }, [activeIndex]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselData.length);
  };

  const handleExplore = () => {
    // Flip the active card to show details
    setFlippedCards(prev => ({
      ...prev,
      [activeIndex]: true
    }));
    setFocusedCard(activeIndex);
  };

  return (
    <div style={styles.container}>
      {/* Film grain overlay */}
      <div style={styles.filmGrain} />
      
      {/* Vignette effect */}
      <div style={styles.vignette} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>GEOMETRY</div>
        <nav style={styles.nav}>
          <button 
            style={styles.navButton}
            onMouseOver={(e) => e.target.style.color = '#4fc3f7'}
            onMouseOut={(e) => e.target.style.color = 'white'}
          >
            Planets
          </button>
          <button 
            style={styles.navButton}
            onMouseOver={(e) => e.target.style.color = '#4fc3f7'}
            onMouseOut={(e) => e.target.style.color = 'white'}
          >
            Space
          </button>
          <button 
            style={styles.navButton}
            onMouseOver={(e) => e.target.style.color = '#4fc3f7'}
            onMouseOut={(e) => e.target.style.color = 'white'}
          >
            Explore
          </button>
          <button 
            style={styles.navButton}
            onMouseOver={(e) => e.target.style.color = '#4fc3f7'}
            onMouseOut={(e) => e.target.style.color = 'white'}
          >
            About
          </button>
        </nav>
        <button 
          style={styles.subscribeButton}
          onMouseOver={(e) => {
            e.target.style.background = '#4fc3f7';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'white';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Subscribe
        </button>
      </header>

      {/* 3D Canvas */}
      <div ref={mountRef} style={styles.canvas} />

      {/* Content Overlay - Hide when card is focused, show FLIP CARD button only when active card is not flipped */}
      {focusedCard === null && !flippedCards[activeIndex] && (
        <div style={styles.overlay}>
          <div style={styles.content}>
            <div style={styles.subtitle}>{activeItem.subtitle.toUpperCase()}</div>
            <h1 style={styles.title}>{activeItem.title}</h1>
            <p style={styles.description}>
              {activeItem.description}
            </p>
            <button 
              onClick={handleExplore}
              style={styles.exploreButton}
              onMouseOver={(e) => {
                e.target.style.background = '#4fc3f7';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              FLIP CARD
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons - Hide when card is focused */}
      {focusedCard === null && (
        <>
          <button
            onClick={handlePrevious}
            style={styles.navPrev}
            onMouseOver={(e) => {
              e.target.style.color = '#4fc3f7';
              e.target.style.background = 'rgba(79, 195, 247, 0.2)';
              e.target.style.borderColor = '#4fc3f7';
              e.target.style.transform = 'translateY(-50%) translateX(-5px)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'white';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(-50%) translateX(0)';
            }}
          >
            ← PREVIOUS
          </button>
          <button
            onClick={handleNext}
            style={styles.navNext}
            onMouseOver={(e) => {
              e.target.style.color = '#4fc3f7';
              e.target.style.background = 'rgba(79, 195, 247, 0.2)';
              e.target.style.borderColor = '#4fc3f7';
              e.target.style.transform = 'translateY(-50%) translateX(5px)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'white';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(-50%) translateX(0)';
            }}
          >
            NEXT →
          </button>
        </>
      )}

      {/* Bottom indicator - Hide when card is focused */}
      {focusedCard === null && (
        <div style={styles.indicators}>
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                ...styles.indicator,
                ...(index === activeIndex ? styles.indicatorActive : styles.indicatorInactive)
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;