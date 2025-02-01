.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background: rgba(147, 51, 234, 0.05);
  border-right: 1px solid rgba(147, 51, 234, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  z-index: 100;
}

.nav-item {
  width: 50px;
  height: 50px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  position: relative;
  background: rgba(147, 51, 234, 0.03);
  border: 1px solid rgba(147, 51, 234, 0.1);
}

.nav-item:hover, .nav-item.active {
  color: #9333EA;
  background: rgba(147, 51, 234, 0.1);
  border-color: rgba(147, 51, 234, 0.2);
  transform: translateY(-2px);
}

.nav-item i {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.nav-item:hover i, .nav-item.active i {
  transform: scale(1.1);
}

.nav-tooltip {
  position: absolute;
  left: 70px;
  padding: 8px 12px;
  background: rgba(147, 51, 234, 0.9);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-style: solid;
  border-width: 6px 6px 6px 0;
  border-color: transparent rgba(147, 51, 234, 0.9) transparent transparent;
}

.nav-item:hover .nav-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.language-switch {
  margin-top: auto;
  padding: 10px;
  border-radius: 12px;
  background: rgba(147, 51, 234, 0.05);
  border: 1px solid rgba(147, 51, 234, 0.1);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-switch:hover {
  background: rgba(147, 51, 234, 0.1);
  border-color: rgba(147, 51, 234, 0.2);
  transform: translateY(-2px);
} 