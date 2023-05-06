import React, { useState } from "react";

export default function Main() {
    const [colorData, setColorData] = useState({
        colorTextRGB: "rgb(255,255,255)",
        colorTextHex: "#FFFFFF",
        colorBackgroundRGB: "rgb(0,0,0)",
        colorBackgroundHex: "#000000",
    });
    const [customText, setCustomText] = useState("Custom Text");

    const generateRandomColorText = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        const { colorTextRGB, colorTextHex } = rgbToHex(r, g, b);
        setColorData((prevState) => ({
            ...prevState,
            colorTextRGB,
            colorTextHex,
        }));
    };

    const generateRandomColorBackground = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        const { colorBackgroundRGB, colorBackgroundHex } = rgbToHex(r, g, b);
        setColorData((prevState) => ({
            ...prevState,
            colorBackgroundRGB,
            colorBackgroundHex,
        }));
    };

    const generateRandomColorBoth = () => {
        generateRandomColorText();
        generateRandomColorBackground();
    };

    const rgbToHex = (r, g, b) => {
        const redHex = r.toString(16).padStart(2, "0");
        const greenHex = g.toString(16).padStart(2, "0");
        const blueHex = b.toString(16).padStart(2, "0");
        const colorRGB = `rgb(${r},${g},${b})`;
        const colorHex = `#${redHex}${greenHex}${blueHex}`;
        return {
            colorTextRGB: colorRGB,
            colorTextHex: colorHex,
            colorBackgroundRGB: colorRGB,
            colorBackgroundHex: colorHex,
        };
    };

    const handleCustomText = (e) => setCustomText(e.target.value);

    const handleClick = (event) => {
        event.preventDefault();
        event.target.classList.add("copy");

        setTimeout(() => {
            event.target.classList.remove("copy");
        }, 1000);
    };

    const colorInfoExtracts = document.querySelectorAll(".color-info-extract");

    colorInfoExtracts.forEach((extract) => {
        extract.addEventListener("click", handleClick);
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="wrapper">
            <h1 className="title">FEColorz</h1>
            <p
                className="color-txt"
                style={{
                    color: colorData.colorTextRGB,
                    backgroundColor: colorData.colorBackgroundRGB,
                }}
                placeholder="Custom Text"
                onClick={handleCustomText}
                contentEditable={true}
            >
                {customText}
            </p>
            <div className="color-info-container">
                <span className="color-info-title">RGB Colors</span>
                <br />
                <span className="color-info">text: </span>
                <div
                    className="color-info-extract"
                    onClick={() => copyToClipboard(colorData.colorTextRGB)}
                >
                    {colorData.colorTextRGB}
                </div>
                <br />
                <span className="color-info">background: </span>
                <div
                    className="color-info-extract"
                    onClick={() =>
                        copyToClipboard(colorData.colorBackgroundRGB)
                    }
                >
                    {colorData.colorBackgroundRGB}
                </div>
                <br />
                <br />
                <br />
                <span className="color-info-title">Hex Colors</span>
                <br />
                <span className="color-info">text: </span>
                <div
                    className="color-info-extract"
                    onClick={() => copyToClipboard(colorData.colorTextHex)}
                >
                    {colorData.colorTextHex}
                </div>
                <br />
                <span className="color-info">background: </span>
                <div
                    className="color-info-extract"
                    onClick={() =>
                        copyToClipboard(colorData.colorBackgroundHex)
                    }
                >
                    {colorData.colorBackgroundHex}
                </div>
                <br />
            </div>
            <button className="random-btn" onClick={generateRandomColorText}>
                Randomize TEXT color!
            </button>
            <button
                className="random-btn"
                onClick={generateRandomColorBackground}
            >
                Randomize BACKGROUND color!
            </button>
            <button className="random-btn" onClick={generateRandomColorBoth}>
                Randomize BOTH colors!
            </button>
        </div>
    );
}
