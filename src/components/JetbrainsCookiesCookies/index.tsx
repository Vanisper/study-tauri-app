import React, { useEffect, useState } from "react";
import styles from "./styles.module.less"; // Import Less Module
import { OnCloseProps, SectionProps } from "./types"; // 引入共享类型

const Backdrop: React.FC<OnCloseProps> = ({ isClosing, onClose }) => (
  <div
    className={`${styles.jetbrainsCookiesBackdrop} ${isClosing ? styles.jetbrainsCookiesBackdropHide : ""
      }`}
    onClick={onClose}
  ></div>
);

const Dialog: React.FC<OnCloseProps> = ({ isClosing, onClose }) => (
  <div className={`${styles.jetbrainsCookiesBanner} ${isClosing ? styles.jetbrainsCookiesBannerHide : ""
    }`}>
    <div className={styles.jetbrainsCookiesBannerSign}>Cookie Settings</div>
    <div className={styles.jetbrainsCookiesBannerBody}>
      <Section>
        <p>
          Our website uses some cookies and records your IP address for
          accessibility, security, and managing your access to the
          telecommunication network. You can disable data collection and cookies
          by changing your browser settings, but it may affect how this website
          functions. <a href="https://www.jetbrains.com/legal/docs/privacy/cookie-notice/">Learn more</a>.
        </p>
      </Section>
      <Section>
        <p>
          With your consent, JetBrains may also use cookies and your IP address
          to collect individual statistics and provide personalized offers and ads
          subject to the <a href="https://www.jetbrains.com/legal/docs/privacy/privacy/">Privacy Notice</a> and the <a href="https://www.jetbrains.com/legal/docs/company/useterms/">Terms of Use</a>.
          You can adjust or withdraw your consent at any time by visiting the <a href="https://www.jetbrains.com/opt-out/">Opt-Out page</a>.
        </p>
        <Actions onClose={onClose} />
      </Section>
    </div>
  </div>
);

const Section: React.FC<SectionProps> = ({ children }) => (
  <div className={styles.jetbrainsCookiesBannerSection}>
    {children} {/* Now you can safely pass block-level elements like <div> */}
  </div>
);

const Actions: React.FC<OnCloseProps> = ({ onClose }) => (
  <div className={styles.jetbrainsCookiesBannerActions}>
    <button className={`${styles.jetbrainsCookiesBannerButton} ${styles.jetbrainsCookiesBannerButtonAccent}`} onClick={onClose}>
      Accept All
    </button>
    <button className={styles.jetbrainsCookiesBannerButton}>
      Manage Settings
    </button>
    <button className={styles.jetbrainsCookiesBannerButton} aria-label="Close cookies banner" onClick={onClose}>
      Close
    </button>
  </div>
);

const JetbrainsCookies: React.FC<OnCloseProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false); // 状态控制是否处于关闭状态
  let closeTimeout: number | null = null;

  const handleClose = () => {
    setIsClosing(true); // 触发关闭状态
    if (onClose) {
      closeTimeout = setTimeout(() => {
        onClose(); // 延迟后调用真正的关闭逻辑
      }, 300); // 假设动画持续 300ms，可以根据需要调整
    }
  };

  useEffect(() => {
    // 清理函数确保在组件卸载或重新渲染时清除计时器
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, []);


  return (
    <>
      <Backdrop isClosing={isClosing} onClose={handleClose} />
      <Dialog isClosing={isClosing} onClose={handleClose} />
    </>
  );
};

export default JetbrainsCookies;
