import { extensionUrlWithParams } from "@/helpers/url";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

// These are the query parameters passed to the UI Extension automatically
type QueryParams = {
  ticket_id: string;
  customer_id: string;
  account_uuid: string;
  subdomain: string;
  pos_url: string;
};

export default function PosExtension() {
  const router = useRouter();
  const query = router.query as QueryParams;
  const [externalWindow, setExternalWindow] = useState<Window | null>(null);

  // Sends a message to the parent window
  // This is the primary way to communicate with the POS
  const sendMessage = (command: string, params?: any) => {
    parent.postMessage(JSON.stringify({ command, params }), "*");
  };

  // Sends the hide command to hide the UI Extension
  const hide = () => {
    console.log("Hiding extension");
    sendMessage("hide");
  };

  // Sends the show command to show the UI Extension
  const show = () => {
    console.log("Showing extension");
    sendMessage("show");
  };

  // Sends the hide command, then after 3 seconds sends the show command
  const hideThenShow = () => {
    hide();
    setTimeout(() => show(), 3000);
  };

  // Opens a new tab or window with the external page
  const openPageInNewTabOrWindow = () => {
    const url = extensionUrlWithParams("extensions/pos/external_page", query);
    console.log("Opening new tab or window", url);
    const win = window.open(url, "_blank");
    setExternalWindow(win);
  };

  // Closes the external window if it exists
  const closeExternalWindow = () => {
    if (externalWindow) {
      console.log("Closing external window");
      externalWindow.close();
      setExternalWindow(null);
    } else {
      console.log("No external window to close");
    }
  };

  // Redirects the POS to a new page
  const redirectToPage = () => {
    const url = extensionUrlWithParams("extensions/pos/external_page", query);
    console.log("Redirecting to page", url);
    sendMessage("redirect", { url });
  };

  // Shows the query parameters in an alert
  const showInfo = () => {
    console.log("Showing info", query);
    alert(JSON.stringify(query, null, 2));
  };

  // Start UI Extension as shown on each page load
  useEffect(() => {
    show();
  }, []);

  return (
    <main className={styles.extension}>
      <div className={styles.wrapper}>
        <p className={styles.title}>HRTL Test Extension</p>
        <button className={styles.button} onClick={hide}>
          Hide
        </button>
        <button className={styles.button} onClick={show}>
          Show
        </button>
        <button className={styles.button} onClick={hideThenShow}>
          Hide then Show
        </button>
        <button className={styles.button} onClick={redirectToPage}>
          Redirect to page
        </button>
        <button className={styles.button} onClick={openPageInNewTabOrWindow}>
          Open new page
        </button>
        {externalWindow && (
          <button className={styles.button} onClick={closeExternalWindow}>
            Close new page
          </button>
        )}
        <button className={styles.button} onClick={showInfo}>
          Show info
        </button>
      </div>
    </main>
  );
}
