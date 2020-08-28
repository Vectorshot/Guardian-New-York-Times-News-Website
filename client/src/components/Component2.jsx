import React from 'react'
import cssobj from '@/CSS/style.scss'

import 'bootstrap/dist/css/bootstrap.css'
console.log(cssobj)
// console.log(bootcss)

export default class Component2 extends React.Component{
    constructor(){
        super()
        this.state={//私有数据

        }
    }
    render(){
        return <div className={cssobj.title}>
            Component2
            <button className="btn btn-primary">按钮</button>
        </div>
    }
}