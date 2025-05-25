import './index.css'

const ThumbnailItem = props => {
    const { imageDetails, isActive ,setActiveThumbnailItem} = props
    const { thumbnailUrl, thumbnailAltText, id } = imageDetails
    const imagename=isActive ? `thumbnail active` : `thumbnail`

    const onClickThumbnail = () => {
        setActiveThumbnailItem(id)
    }

    return (
        <li className="list-container">
            <button
                className="button"
                type="button"
                onClick={onClickThumbnail}
            >
                <img
                    alt={thumbnailAltText}
                    src={thumbnailUrl}
                    className={imagename}
                />
            </button>
        </li>
    )
}

export default ThumbnailItem