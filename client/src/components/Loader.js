import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
function Loader() {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{ marginTop: '300px' }}>
            <div className="sweet-loading text-center">

                <ScaleLoader
                    color='#000'
                    loading={loading}
                    cssOverride=''
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader