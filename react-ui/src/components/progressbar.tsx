import { Progress, Grid } from "@nextui-org/react";

export default function ProgressBar() {
  return (
    <div style={{
        "position": 'absolute',
        "left": "0",
        "right": "0",
        "top": "0",
        "bottom": "0",
        "height": "100vh",
        "zIndex": "1000000",
        "background": "gray",
        "opacity": "60%"
    }}>
        <Progress
          indeterminated
          css={{
            width: "300px",
            margin: "200px auto",
            zIndex: 1000000,
            background: "black",
            opacity: 1
          }}
          value={50}
          color="secondary"
          status="secondary"
        />
    </div>
  );
}
