
export interface Ichannel{

        _id: string; 
        id?: string;              
        title?: string;        
        avatarUrl?: string;    
        username?: string;     
        description?: string;
        isOnline: boolean;     
      
}

export interface IChannelUpdate{
        title: string;        
        avatarUrl: string;    
        description: string;
        isOnline: boolean;
}