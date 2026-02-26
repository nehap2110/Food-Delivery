export const trackVisitor = (panel) => {
    const sessionKey = `visited_${panel}`;


    if (sessionStorage.getItem(sessionKey)) return;

    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("visitor_id", visitorId);
    }


    sessionStorage.setItem(sessionKey, "true");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/visitor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            visitorId,
            panel,
        }),
    }).catch(() => { });
};
