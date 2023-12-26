import React, { useEffect } from "react";

const useEffectWithoutFirstRendering = (
	callBack: Function,
	dependencies: any[]
) => {
	const firstRenderDone = React.useRef(false);
	useEffect(() => {
		if (!firstRenderDone.current) {
			firstRenderDone.current = true;
			return;
		}
		callBack();
	}, [dependencies, callBack]);
};

export default useEffectWithoutFirstRendering;
