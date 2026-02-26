export const trackVisitor = async (panel) => {
    const sessionKey = `visited_${panel}`;


    if (sessionStorage.getItem(sessionKey)) {
        console.log(`⏭️ ${panel} already tracked this session`);
        return;
    }

    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("visitor_id", visitorId);
    }

    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/visitor`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ visitorId, panel }),
            }
        );

        if (!res.ok) throw new Error("Tracking failed");


        sessionStorage.setItem(sessionKey, "true");
        console.log(`✅ ${panel} visit recorded`);
    } catch (err) {
        console.warn(`❌ Failed to track ${panel} visit`, err);

    }
};
