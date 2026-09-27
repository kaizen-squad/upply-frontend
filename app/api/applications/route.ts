import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PrestataireSelectedDataSchema } from '@/types';

export async function POST (request: Request) {

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, data: null, message: 'Invalid application data' },
        { status: 400 }
      );
    }

    const application = PrestataireSelectedDataSchema.safeParse(body);
    if (!application.success) {
      return NextResponse.json(
        { success: false, data: null, message: 'Invalid application data' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    
    cookieStore.set('applicationData', JSON.stringify(application.data), {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',     
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: '/',           
    });

    return NextResponse.json({success: true, message: 'Application data stored in cookie.'});
}

export async function GET() {
    const cookieStore = await cookies();
    const applicationData = cookieStore.get('applicationData');
    if(applicationData){
        try {
            const application = PrestataireSelectedDataSchema.safeParse(JSON.parse(applicationData.value));
            if (application.success) {
                return NextResponse.json({success: true, data: application.data, message: 'Application data retrieved from cookie'});
            }
        } catch {
            // Invalid cookie contents are handled as missing application data.
        }

        cookieStore.delete('applicationData');
    }
    return NextResponse.json({success: false, data: null, message: 'No application data found in cookie'});
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('applicationData');
    return NextResponse.json({success: true, message: 'Application data deleted.'});
}
