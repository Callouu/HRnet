import React, { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = "md",
  className = "",
}) {
  useEffect(() => {
    const handleKey = (e) => {
      if (closeOnEsc && e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const sizeStyle =
    {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-2xl",
    }[size] || "max-w-md";

  return (
    <div
      className="modal-overlay"
      onClick={() => closeOnOverlayClick && onClose()}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        className={`modal ${sizeStyle} ${className}`}
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          position: "relative",
          width: "90%",
          maxWidth: size === "lg" ? "800px" : size === "sm" ? "400px" : "600px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              fontSize: "1.5rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        )}
        {title && <h2 style={{ marginBottom: "1rem" }}>{title}</h2>}
        <div style={{ marginBottom: "1rem" }}>{children}</div>
      </div>
    </div>
  );
}
