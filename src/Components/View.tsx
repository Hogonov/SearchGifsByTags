import React from 'react';

type Images = {
    isGroup: boolean;
    images: Array<{ url: string, tag: string }>;
    groupImages: any;
    clickImgHandler(event: React.MouseEvent<HTMLImageElement>): void;
}

export const View: React.FunctionComponent<Images> = ({isGroup, images, groupImages, clickImgHandler}) => {

    if (isGroup) {
        return <div className='viewBlockGroup'>
            {
                Object.keys(groupImages).map((key, index) => {
                    return <div className='group' key={index}>
                        <h2>{key}</h2>
                        <div>
                            {
                                groupImages[key].map((img: { url: string, tag: string }, index: number) => {
                                    if (img.url.indexOf('%%&%%') !== -1) {
                                        let urlArr = img.url.split("%%&%%")
                                        urlArr.pop()
                                        return <div className='divImgCollage' key={index}>
                                            {urlArr.map((url: string, index: number) => {
                                                    return <img key={index} id={img.tag} onClick={clickImgHandler}
                                                                className='img' src={url} alt='img'/>
                                                }
                                            )}
                                        </div>
                                    } else {
                                        return <div className='divImg' key={index}>
                                            <img id={img.tag} onClick={clickImgHandler} className='img' src={img.url}
                                                 alt='img'/>
                                        </div>
                                    }
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>
    } else {
        return <div className='viewBlock'>
            {images.map((img: { url: string, tag: string }, index: number) => {
                    if (img.url.indexOf('%%&%%') !== -1) {
                        let urlArr = img.url.split("%%&%%")
                        urlArr.pop()
                        return <div className='divImgCollage' key={index}>
                            {urlArr.map((url: string, index: number) => {
                                    return <img key={index} id={img.tag} onClick={clickImgHandler} className='img' src={url}
                                                alt='img'/>
                                }
                            )}
                        </div>
                    } else {
                        return <div className='divImg' key={index}>
                            <img id={img.tag} onClick={clickImgHandler} className='img' src={img.url} alt='img'/>
                        </div>
                    }
                }
            )}
        </div>;
    }

}

export default View;
