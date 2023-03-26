import React,{ useState, useEffect } from 'react'
import { Switch,Select,Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector } from 'react-redux'
import moment from 'moment/min/moment-with-locales'
//functions
import { listUser,
    changeStatus,
    changeRole,
    removeUser,
} from '../../functions/users'


const ManageAdmin = () => {

    const {user} = useSelector((state) =>({...state}))
    // console.log(user);
    const [data, setData] = useState([]);
    // console.log(data);
    useEffect(()=>{
        loadData(user.token)
    },[])

    const loadData = (authtoken) => {

        listUser(authtoken)
        // ถ้ามีการติดต่อหลังบ้าน ควรมี then ด้วย
        .then(res=>{
            setData(res.data);
        }).catch(err=>{
            console.log(err.response.data)
        });
    };

    const handleOnchange = (e,id) => {
        const value = {
            id:id,
            enabled:e
        }
        // console.log(value);
        changeStatus(user.token,value)
        .then(res=>{
            loadData(user.token)
            console.log(res);
        }).catch((err)=> {
            console.log(err.response);
        })
    }
    const roleData = ['admin','user']

    const handleChangeRole =(e, id) =>{
        let values ={
            id:id,
            role:e
        }
        changeRole(user.token,values)
        .then(res=>{
            loadData(user.token)
            console.log(res);
        }).catch(err=>{
            console.log(err.response);
        })
    }
    
    const handleRemove =(id) =>{
        if(window.confirm('Are You sure Delete ?')) {
            removeUser(user.token,id)
            .then(res=>{
                loadData(user.token)
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
            
        }
    }

    return (
        <div class="container-fluid">
            <div clsas="row">
                <div class="col-md-2">
                    <MenubarAdmin/>
                </div>    
                
                <div class="col">
                    <h1>Manage Admin</h1>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">username</th>
                            <th scope="col">role</th>
                            <th scope="col">status</th>
                            <th scope="col">created</th>
                            <th scope="col">updated</th>
                            <th scope="col">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index)=>
                            <tr>
                                <th scope="row">{item.username}</th>
                                <td>
                                    <Select 
                                    style={{width:'100%'}} 
                                    defaultValue={item.role}
                                    onChange={(e)=> handleChangeRole(e,item._id)}
                                    >
                                        {roleData.map((item,index)=>
                                            <Select.Option 
                                            value={item} 
                                            key={index}
                                            >
                                                {item ==='admin' 
                                                ? <Tag color='#87d068'>{item}</Tag>
                                                : <Tag color='#f50'>{item}</Tag> }
                                            </Select.Option>
                                        )}
                                    </Select>
                                </td>
                                <td>
                                    <Switch checked={item.enabled} onChange={(e)=>handleOnchange(e,item._id)}/>
                                </td>
                                <td>
                                    {moment(item.createdAt).locale('th').format('ll')}
                                </td>
                                <td>
                                    {moment(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow()}   
                                </td>
                                <td><DeleteOutlined onClick={() => handleRemove(item._id)}/></td>
                            </tr>
                            )}       
                        </tbody>
                    </table>
                </div> 
            </div>     
        </div>
    )
}

export default ManageAdmin