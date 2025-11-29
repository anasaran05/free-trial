// src/components/onboarding/IntroVideo.tsx
export const IntroVideo = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        gap: 12
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: 8
        }}
      >
        <iframe
          src="https://youtu.be/jGFy7n0O_E4?si=Cj_KrgZEawa0Czau"
          style={{ width: "100%", height: "100%", border: 0 }}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.45,
          color: "#333",
          textAlign: "center"
        }}
      >
        This quick walkthrough shows how your training journey flows from dashboard
        to tasks. Watch once to understand the workflow.
      </p>
    </div>
  );
};