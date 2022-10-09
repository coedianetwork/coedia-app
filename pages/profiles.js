import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { client, recommendProfiles } from '../api';
import Link from 'next/link';

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();  
  });

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendProfiles).toPromise();
      console.log({ response });
      setProfiles(response.data.recommendedProfiles);
      console.log('Count: ', profiles.length);
    } catch (e) {
      console.log({ e });
    }
  }
  return (
    <div>
      {profiles &&
        profiles.map((profile, index) => (
          <Link href={`/profile/${profile.id}`} key={`${profile.id}`}>
            <a>
              <div>
                  {profile.picture ? (
                    <Image
                      src={profile.picture.original?.url}
                      alt="UserPic"
                      width="64px"
                      height="64px"
                      style={{borderRadius: '50%', overflow: 'hidden'}}
                    ></Image>
                  ) : (
                    <p
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        fontSize: '24pt',
                        backgroundColor: 'darkgray',
                        textAlign: 'center',
                        paddingTop: '12px',
                      }}
                    >
                      👤
                    </p>
                  )}
                <h2>{profile.handle}</h2>
                <p>{!profile.bio ? (<i>Sin bio aún...</i>  ) : profile.bio }</p>
                <div>
                    <p>Followers { profile.stats.totalFollowers }</p>
                    <p>Following { profile.stats.totalFollowing }</p>
                    <p>Posts { profile.stats.totalPosts }</p>
                
                </div>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
}
