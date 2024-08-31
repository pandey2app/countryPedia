import React from 'react'
import '../styles/pageNotFound.css'

export default function PageNotFound() {
    return (
        <>
            <div className="error-page-wrap">
                <article className="error-page gradient">
                    <hgroup>
                        <h1>404</h1>
                        <h2>oops! page not found</h2>
                    </hgroup>
                    <a href="#" title="Back to site" className="error-back">Back</a>
                </article>
            </div>
        </>
    )
}
