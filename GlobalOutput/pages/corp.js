import Head from 'next/head'
import Image from 'next/image'
import {Component} from "react"
import { useRouter } from 'next/router'

export default class Corp extends Component {
	constructor(props){
		super(props)
		this.state = {
		}

		// const router = useRouter()
  // 		const { corp_id } = router.query
	}

	async pullProfile(){
		console.log("PROPS", this.props)
	}

	componentDidMount(){
		this.pullProfile()
	}

	render(){
		return (
			<div> Corp </div>
		)
	}

}