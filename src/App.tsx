import { LivePlayerProvider } from '@twick/live-player';
import { TimelineProvider, INITIAL_TIMELINE_DATA } from '@twick/timeline';
import TwickStudio from '@twick/studio';
import "@twick/studio/dist/studio.css";

function App() {

  return (
    <LivePlayerProvider>
      <TimelineProvider
        initialData={INITIAL_TIMELINE_DATA}
        contextId={"studio-demo"}
      >
        <TwickStudio studioConfig={{
          videoProps: {
            width: 720,
            height: 1280,
          }}
          }/>
      </TimelineProvider>
    </LivePlayerProvider>
  );
}

export default App
