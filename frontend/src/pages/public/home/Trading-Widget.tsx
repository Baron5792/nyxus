import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '../../../context/ThemeContext';

function TradingViewWidget() {
    const { theme } = useTheme();
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentContainer = container.current;

        if (!currentContainer) return;

        // Remove the previous TradingView widget
        currentContainer.innerHTML = "";

        const script = document.createElement("script");

        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

        script.type = "text/javascript";
        script.async = true;

        script.innerHTML = `
        {
            "allow_symbol_change": true,
            "calendar": false,
            "details": false,
            "hide_side_toolbar": true,
            "hide_top_toolbar": false,
            "hide_legend": false,
            "hide_volume": false,
            "hotlist": false,
            "interval": "D",
            "locale": "en",
            "save_image": true,
            "style": "1",
            "symbol": "BINANCE:BTCUSDT",

            "theme": "${theme === "dark" ? "dark" : "light"}",

            "timezone": "Etc/UTC",

            "backgroundColor": "${theme === "dark"
                ? "#2B303A"
                : "#FFFFFF"}",

            "gridColor": "${theme === "dark"
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(46, 46, 46, 0.06)"}",

            "watchlist": [],
            "withdateranges": false,
            "compareSymbols": [],
            "studies": [],
            "autosize": false,
            "height": "400"
        }`;

        currentContainer.appendChild(script);

        return () => {
            currentContainer.innerHTML = "";
        };

    }, [theme]);

    return (
        <div
            className="tradingview-widget-container"
            style={{
                width: '100%'
            }}
        >
            <div
                ref={container}
                className="tradingview-widget-container__widget"
                style={{
                    height: "400px",
                    width: "100%"
                }}
            ></div>

            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/symbols/BTCUSDT/?exchange=BINANCE"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="text-secondary" style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>
                        {import.meta.env.VITE_APP_NAME} BTCUSDT price
                    </span>
                </a>
                
                
                {/* <span className="trademark">
                    {" "}by TradingView
                </span> */}
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);