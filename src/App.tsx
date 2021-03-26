import React, {useEffect, useState} from 'react';
import 'materialize-css';
import Menu from './Components/Menu';
import View from './Components/View';
import * as _ from 'lodash';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHttp} from "./Hooks/hook.fetch";


type ArrayImages = { url: string, tag: string }

const App: React.FunctionComponent = () => {
    const {request, loading} = useHttp();
    const [isGroup, setGroup] = useState<boolean>(false);
    const [isDelay, setIsDelay] = useState<boolean>(false);
    const [tag, setTag] = useState<string>('')
    const [images, setImages] = useState<Array<ArrayImages>>([])
    const [groupImages, setGroupImages] = useState<object>({})
    const btnText = {
        load: 'Загрузить',
        loading: 'Загрузка...',
        clear: 'Очистить',
        group: 'Группировать',
        ungroup: 'Разгруппировать'
    };
    const API_KEY: string = 'mqOwZdpFzhL7pBdlwGFQdjJKw1RetGYg'
    const URL: string = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=`

    useEffect(() => {
        try {
            let sortedArray: any = _.groupBy(images.slice(), 'tag');
            setGroupImages(sortedArray)
        } catch (e) {
        }
    }, [images]);


    const clickImgHandler = async (event: React.MouseEvent<HTMLImageElement>) => {
        try {
            setTag(event.currentTarget.id)
        } catch (e) {
        }
    }
    const searchRandomGif = async () => {
        try {
            const randStr: string = randomString()
            const result: any = await request(URL + randStr);
            if (result.data.length !== 0) {
                let arr = images.slice();
                arr.push({tag: randStr, url: result.data.image_url})
                setImages(arr)
            } else {
                toast(`Картинка по тегу \"${randStr}\" не найдена`)
            }

        } catch (e) {
        }
    }

    useEffect(() => {
        if (isDelay) {
            let timerID = setInterval(searchRandomGif, 5000)
            return () => clearInterval(timerID)
        }
    })

    const randomString = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let maxLength = Math.floor(Math.random() * 11);
        for (let i = 0; i < maxLength; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            switch (event.currentTarget.name) {
                case 'load': {
                    try {
                        if (tag.length < 1) {
                            toast("Заполните поле \"тег\"")
                        } else if (tag.indexOf(',') === -1) {
                            if (tag === 'delay') {
                                setIsDelay(!isDelay);
                                await searchRandomGif();
                            } else {
                                const result: any = await request(URL + tag);
                                if (result.data.length !== 0) {
                                    let arr = images.slice();
                                    arr.push({tag: tag, url: result.data.image_url})
                                    setImages(arr)
                                } else {
                                    toast(`Картинка по тегу \"${tag}\" не найдена`)
                                }
                            }
                        } else {
                            let queryArr = tag.split(',')
                            let url: string = ''
                            for (const query of queryArr) {
                                const result: any = await request(URL + query);
                                if (result.data.length !== 0) {
                                    url += `${result.data.image_url}%%&%%`
                                } else {
                                    toast(`Картинка по тегу \"${query}\" в запросе ${tag} не найдена`)
                                }
                            }
                            let arr = images.slice();
                            arr.push({tag: tag, url: url})
                            setImages(arr)
                        }

                    } catch (e) {
                    }
                    break;
                }
                case 'clear': {
                    setTag('')
                    setImages([])
                    setIsDelay(false)
                    break;
                }
                case 'group': {
                    setGroup(!isGroup)
                    break;
                }
            }
        } catch (e) {
        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setTag(event.target.value)
        } catch (e) {
        }
    }

    return (<>
        <Menu
            tag={tag}
            changeHandler={changeHandler}
            clickHandler={clickHandler}
            btnText={btnText}
            loading={loading}
            isGroup={isGroup}
        />
        <ToastContainer/>
        <View
            images={images}
            clickImgHandler={clickImgHandler}
            groupImages={groupImages}
            isGroup={isGroup}
        />
    </>);
}

export default App;
