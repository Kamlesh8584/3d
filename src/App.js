import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const carouselData = [
  { 
    id: 1, 
    title: "Day 1 Package", 
    subtitle: "Essential Coverage", 
    description: "Complete photography coverage for your special day", 
    color: "#4fc3f7", 
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1000&fit=crop&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop&q=80",
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
    background: 'radial-gradient(ellipse at center, #1a0a0a 0%, #000000 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    touchAction: 'pan-y pinch-zoom',
  },
  backgroundBokeh: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 1.5rem',
  },
  logo: {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
    textAlign: 'center',
    textShadow: '0 0 30px rgba(79, 195, 247, 0.8), 0 0 60px rgba(79, 195, 247, 0.4), 2px 2px 0 rgba(0, 0, 0, 0.5), 4px 4px 0 rgba(0, 0, 0, 0.3)',
    transform: 'perspective(500px) rotateX(10deg)',
    background: 'linear-gradient(to bottom, #ffffff 0%, #4fc3f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
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
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    marginBottom: '0.5rem',
  },
  title: {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
    margin: '0 0 1rem 0',
    textShadow: '0 0 20px rgba(79, 195, 247, 0.5)',
  },
  description: {
    color: '#9ca3af',
    fontSize: '0.75rem',
    maxWidth: '90%',
    margin: '0 auto',
    lineHeight: '1.6',
    padding: '0 1rem',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 30,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.25rem',
    transition: 'all 0.3s',
    pointerEvents: 'auto',
  },
  navPrev: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    color: 'white',
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.75rem 1rem',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  navNext: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    color: 'white',
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.75rem 1rem',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  indicators: {
    position: 'absolute',
    bottom: '2rem',
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
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  popupCard: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    borderRadius: '20px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(79, 195, 247, 0.3)',
    border: '2px solid rgba(79, 195, 247, 0.3)',
    position: 'relative',
    animation: 'popupFadeIn 0.3s ease-out',
  },
  popupHeader: {
    padding: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  popupTitle: {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textShadow: '0 0 20px rgba(79, 195, 247, 0.5)',
  },
  popupSubtitle: {
    color: '#4fc3f7',
    fontSize: '1rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  popupBody: {
    padding: '2rem',
  },
  popupDescription: {
    color: '#d1d5db',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  popupDetailsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  popupDetailItem: {
    color: 'white',
    fontSize: '1rem',
    padding: '0.75rem 1rem',
    marginBottom: '0.75rem',
    background: 'rgba(79, 195, 247, 0.1)',
    borderRadius: '10px',
    borderLeft: '4px solid #4fc3f7',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  popupFooter: {
    padding: '1.5rem 2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
  popupButton: {
    padding: '0.75rem 2rem',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  popupButtonPrimary: {
    background: 'linear-gradient(135deg, #4fc3f7 0%, #2196f3 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(79, 195, 247, 0.4)',
  },
  popupButtonSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  popupCloseButton: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.5rem',
    transition: 'all 0.3s',
    zIndex: 10,
  },
};

// Add keyframes and media queries
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
  @keyframes popupFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  @keyframes bokehFloat {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8});
    }
  }
  @media (min-width: 768px) {
    .logo { font-size: 3rem !important; }
    .header { padding: 2.5rem 3rem !important; }
    .nav-prev { left: 3rem !important; font-size: 1rem !important; padding: 1rem 1.5rem !important; }
    .nav-next { right: 3rem !important; font-size: 1rem !important; padding: 1rem 1.5rem !important; }
    .title { font-size: 4.5rem !important; margin-bottom: 1.5rem !important; }
    .subtitle { font-size: 0.875rem !important; margin-bottom: 1rem !important; }
    .description { font-size: 0.875rem !important; max-width: 42rem !important; }
    .indicators { bottom: 3rem !important; }
    .close-btn { top: 2rem !important; right: 2rem !important; width: 3rem !important; height: 3rem !important; font-size: 1.5rem !important; }
  }
  @media (max-width: 767px) {
    .logo { font-size: 1.25rem !important; padding: 0 0.5rem !important; }
    .popup-title { font-size: 1.5rem !important; }
    .popup-body { padding: 1.5rem !important; }
    .popup-header { padding: 1.5rem !important; }
    .popup-footer { padding: 1rem 1.5rem !important; flex-direction: column; }
    .popup-button { width: 100%; }
    .popup-card { max-width: 95% !important; margin: 0 auto; }
    .nav-prev { left: 0.5rem !important; font-size: 0.65rem !important; padding: 0.6rem 0.8rem !important; }
    .nav-next { right: 0.5rem !important; font-size: 0.65rem !important; padding: 0.6rem 0.8rem !important; }
  }
  @media (max-width: 480px) {
    .logo { font-size: 1rem !important; }
    .title { font-size: 1.5rem !important; }
    .subtitle { font-size: 0.65rem !important; }
    .description { font-size: 0.7rem !important; }
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
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const bokehParticlesRef = useRef([]);

  const activeItem = carouselData[activeIndex];

  // Bokeh background effect
  useEffect(() => {
    const bokehContainer = document.getElementById('bokeh-container');
    if (!bokehContainer) return;

    // Clear existing particles
    bokehContainer.innerHTML = '';
    const particles = [];

    // Create 30 bokeh particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 120 + 40;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.4 + 0.1;
      
      const colors = ['#4fc3f7', '#ab47bc', '#26a69a', '#ffd700', '#ff6b9d', '#c084fc'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: radial-gradient(circle, ${color} 0%, transparent 70%);
        border-radius: 50%;
        opacity: ${opacity};
        filter: blur(${Math.random() * 30 + 10}px);
        animation: bokehFloat ${duration}s ease-in-out ${delay}s infinite alternate;
        pointer-events: none;
      `;

      bokehContainer.appendChild(particle);
      particles.push(particle);
    }

    bokehParticlesRef.current = particles;

    return () => {
      bokehContainer.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 5, 20);
    scene.background = null; // Make scene background transparent
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
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Main front light to illuminate cards facing camera
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(0, 5, 10);
    scene.add(frontLight);

    // Dynamic spotlight that follows active object
    const spotLight = new THREE.SpotLight(0xffffff, 1);
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

    // Rim lights for cinematic effect - reduced intensity
    const rimLight1 = new THREE.DirectionalLight(0x4fc3f7, 0.3);
    rimLight1.position.set(-5, 2, -5);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xab47bc, 0.3);
    rimLight2.position.set(5, 2, -5);
    scene.add(rimLight2);

    // Back light to illuminate cards from behind
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

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
        metalness: 0.0,
        roughness: 1.0,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
        side: THREE.FrontSide,
      });
      
      const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
      frontMesh.castShadow = true;
      frontMesh.receiveShadow = true;
      
      // Load the image texture
      textureLoader.load(
        item.imageUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          frontMaterial.map = texture;
          frontMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Error loading texture:', error);
        }
      );

      cardGroup.add(frontMesh);

      // BACK SIDE - Just the image, no text overlay
      const backGeometry = new THREE.PlaneGeometry(2 * scale, 2.5 * scale);
      
      const backMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.0,
        roughness: 1.0,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
        side: THREE.BackSide,
      });
      
      const backMesh = new THREE.Mesh(backGeometry, backMaterial);
      backMesh.castShadow = true;
      backMesh.receiveShadow = true;
      
      // Load the same image texture for back side
      textureLoader.load(
        item.imageUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          backMaterial.map = texture;
          backMaterial.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.log('Error loading back texture:', error);
        }
      );

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
      // Handle both mouse and touch events
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
      
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
      
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
        
        // Open popup instead of flipping
        setPopupData(carouselData[cardIndex]);
        setShowPopup(true);
      }
    };
    
    window.addEventListener('click', handleClick);
    window.addEventListener('touchend', handleClick);
    
    // Mouse/Touch move for parallax
    const handleMouseMove = (event) => {
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
      
      mouseRef.current.x = (clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });

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
          // Keep emissive at 0 to avoid color tinting
          cardGroup.children[0].material.emissiveIntensity = 0;
        }
      });

      // Smooth rotation of group
      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.05;
      group.rotation.y = currentRotationRef.current;

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
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchend', handleClick);
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

  const handleCloseCard = () => {
    setFlippedCards(prev => ({
      ...prev,
      [focusedCard]: false
    }));
    setFocusedCard(null);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupData(null);
  };

  const handleBookNow = () => {
    // You can redirect to booking page or handle booking
    alert(`Booking ${popupData?.title}! You can redirect to a booking page here.`);
    // For redirect: window.location.href = '/booking?package=' + popupData?.id;
  };

  const handleLearnMore = () => {
    // You can redirect to details page
    alert(`Learn more about ${popupData?.title}! You can redirect to a details page here.`);
    // For redirect: window.location.href = '/package-details/' + popupData?.id;
  };

  return (
    <div style={styles.container}>
      {/* Bokeh Background */}
      <div id="bokeh-container" style={styles.backgroundBokeh}></div>
      
      {/* Film grain overlay */}
      <div style={styles.filmGrain} />
      
      {/* Vignette effect */}
      <div style={styles.vignette} />

      {/* Header */}
      <header style={styles.header} className="header">
        <div style={styles.logo} className="logo">CLICKMORE FILMS</div>
      </header>

      {/* 3D Canvas */}
      <div ref={mountRef} style={styles.canvas} />

      {/* Content Overlay - Hide when card is focused */}
      {focusedCard === null && !flippedCards[activeIndex] && (
        <div style={styles.overlay}>
          <div style={styles.content}>
            <div style={styles.subtitle} className="subtitle">{activeItem.subtitle.toUpperCase()}</div>
            <h1 style={styles.title} className="title">{activeItem.title}</h1>
            <p style={styles.description} className="description">
              {activeItem.description}
            </p>
          </div>
        </div>
      )}

      {/* Close Button - Show when card is focused */}
      {focusedCard !== null && (
        <button
          onClick={handleCloseCard}
          style={styles.closeButton}
          className="close-btn"
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.borderColor = '#4fc3f7';
            e.target.style.transform = 'scale(1.1) rotate(90deg)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          ×
        </button>
      )}

      {/* Navigation Buttons - Hide when card is focused */}
      {focusedCard === null && (
        <>
          <button
            onClick={handlePrevious}
            style={styles.navPrev}
            className="nav-prev"
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
            ← PREV
          </button>
          <button
            onClick={handleNext}
            style={styles.navNext}
            className="nav-next"
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
        <div style={styles.indicators} className="indicators">
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

      {/* Popup Modal */}
      {showPopup && popupData && (
        <div style={styles.popupOverlay} onClick={handleClosePopup}>
          <div style={styles.popupCard} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleClosePopup}
              style={styles.popupCloseButton}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'rotate(90deg) scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'rotate(0deg) scale(1)';
              }}
            >
              ×
            </button>
            
            <div style={styles.popupHeader} className="popup-header">
              <h2 style={styles.popupTitle} className="popup-title">{popupData.title}</h2>
              <p style={styles.popupSubtitle}>{popupData.subtitle}</p>
            </div>
            
            <div style={styles.popupBody} className="popup-body">
              <p style={styles.popupDescription}>{popupData.description}</p>
              
              <h3 style={{ color: '#4fc3f7', marginBottom: '1rem', fontSize: '1.25rem' }}>Package Includes:</h3>
              <ul style={styles.popupDetailsList}>
                <li style={styles.popupDetailItem}>
                  <span style={{ fontSize: '1.5rem' }}>📷</span>
                  <span>{popupData.details.line1}</span>
                </li>
                <li style={styles.popupDetailItem}>
                  <span style={{ fontSize: '1.5rem' }}>🎥</span>
                  <span>{popupData.details.line2}</span>
                </li>
                <li style={styles.popupDetailItem}>
                  <span style={{ fontSize: '1.5rem' }}>📸</span>
                  <span>{popupData.details.line3}</span>
                </li>
                <li style={styles.popupDetailItem}>
                  <span style={{ fontSize: '1.5rem' }}>🎬</span>
                  <span>{popupData.details.line4}</span>
                </li>
                {popupData.details.line5 && (
                  <li style={styles.popupDetailItem}>
                    <span style={{ fontSize: '1.5rem' }}>🚁</span>
                    <span>{popupData.details.line5}</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div style={styles.popupFooter} className="popup-footer">
              <button
                onClick={handleLearnMore}
                style={{...styles.popupButton, ...styles.popupButtonSecondary}}
                className="popup-button"
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.borderColor = '#4fc3f7';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                Learn More
              </button>
              <button
                onClick={handleBookNow}
                style={{...styles.popupButton, ...styles.popupButtonPrimary}}
                className="popup-button"
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 20px rgba(79, 195, 247, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(79, 195, 247, 0.4)';
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;