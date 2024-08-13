import ReactLoading from "react-loading";

function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          <ReactLoading
            type='spinningBubbles'
            color='#F26469'
            delay={1}
            height={60}
            width={100}
          />
        </div>
      )}
    </>
  );
}

export default Loading;
