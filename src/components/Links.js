import React from 'react'
import LinkCard from './LinkCard'
function Links(props) {



    return (
        <div className="links">
            {props.links.reverse().map((link) => {
                return (
                    <LinkCard {...link} deleteLink={props.deleteLink} i={link.key}>
                    </LinkCard>
                )
            })}
        </div>
    )
}


export default Links

