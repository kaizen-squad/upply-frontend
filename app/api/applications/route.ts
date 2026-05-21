import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST (request: Request) {

    const body = await request.json();
    const cookieStore = await cookies();
    
    cookieStore.set('applicationData', JSON.stringify(body), {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',     
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: '/',           
    });

    return NextResponse.json({success: true, message: 'Application data stored in cookie.'});
}

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const applicationData = cookieStore.get('applicationData');
    if(applicationData){
        return NextResponse.json({success: true, data: JSON.parse(applicationData.value), message: 'Application data retrieved from cookie'});
    }
    return NextResponse.json({success: false, data: null, message: 'No application data found in cookie'});
}

export async function DELETE(request:Request) {
    const cookieStore = await cookies();
    cookieStore.delete('applicationData');
    return NextResponse.json({success: true, message: 'Application data deleted.'});
}