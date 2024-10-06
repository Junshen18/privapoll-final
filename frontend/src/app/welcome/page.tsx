"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

import styles from '../../styles/index';
import Image from "next/image";

const startingFeatures = [
    'Scan your Worldcoin wallet with the given QR code.',
    'Verify yourself.',
    'Start voting hosting polls seamlessly.'
];

const newFeatures = [
    {
        title: 'Enhanced Security & Trust',
        subtitle: 'Blockchain-based private polling ensures tamper-proof and transparent voting, enhancing trust in the process.',
    },
    {
        title: 'Privacy & Fraud Detection',
        subtitle: 'It guarantees voter privacy while preventing fraud through secure encryption and decentralized verification.',
    },
];

const socials = [
    {
        name: 'github',
        url: '/github.svg',
        website: 'https://github.com/Junshen18/privapoll-final/'
    },
];


const LandingPage = () => {
    const router = useRouter();

    //loginRoute function will route to /login
    const loginRoute = () => {
        router.push('/login');
    };

    return (
        <div className="px-20">
            <div className='bg-primary-black overflow-hidden'>
                <section className={`${styles.yPaddings}`}>
                    <div className={`${styles.innerWidth} mx-auto flex flex-col my-20`}>
                        <div className="py-20 flex justify-center items-center flex-col relative z-10">
                            <h1 className={styles.heroHeading}>Privapoll</h1>
                            <div className='flex flex-row justify-center items-center'>
                                <h1 className={styles.heroHeading}>Voting System</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='relative'>
                    <section className={`${styles.paddings} relative z-10`}>
                        <div className='gradient-02 z-0' />
                        <div className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}>
                            <p className="mt-24 font-normal text-[14px] text-secondary-white text-center">About Privapoll</p>

                            <p
                                className='mt-[8px] font-normal sm:text-[32px] text-[20px] text-center mx-20 text-secondary-white'
                            >
                                Utilizing the
                                <span className='font-extrabold text-white'> MACI </span>
                                (Minimal Anti-Collusion Infrastructure) framework integrated with blockchain technology
                                to ensure election integrity, while leveraging
                                <span className='font-extrabold text-white'> zk-SNARKs </span>
                                (zero-knowledge proofs) to prevent voter collusion and bribery.
                            </p>

                            <Image
                                src="/arrow-down.svg"
                                alt="arrow down"
                                width={ 16 }
                                height={ 28 }
                                className='w-[18px] h-[28px] object-contain mt-[28px]'
                            />
                        </div>
                    </section>
                    <div className='gradient-03 z-0'/>
                </div>

                <div className='relative'>
                    <section className={`${styles.paddings} relative z-10`}>
                        <div
                            className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
                        >
                            <div className={`flex-1 ${styles.flexCenter}`}>
                                <Image
                                    src="/blockchain-blocks.svg"
                                    width={ 16 }
                                    height={ 28 }
                                    alt='robot'
                                    className='w-[90%] h-[90%] object-contain'
                                />
                            </div>

                            <div
                                className='flex-[0.75] flex justify-center flex-col'
                            >
                                <p className="font-normal text-[14px] text-secondary-white text-center">How to use</p>
                                <p>Get started with just few steps</p>
                                <div className='mt-[31px] flex flex-col max-w-[370px] gap-[24px]'>
                                    {startingFeatures.map((feature, index) => (
                                        <div className={`${styles.flexCenter} flex-row`}>
                                            <div className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323f5d]`}>
                                                <p className='font-bold text-[20px] text-white'>0{index + 1}</p>
                                            </div>
                                            <p className='flex-1 ml-[30px] font-normal text-[18px] text-[#B0B0B0] leading-[32px]'>
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className='gradient-04 z-0'/>
                    <section className={`${styles.paddings} relative z-10`}>
                        <div
                            className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
                        >
                            <div
                                className='flex-[0.75] flex justify-center flex-col'
                            >
                                <p className="font-normal text-[14px] text-secondary-white text-center">Upcoming Features</p>
                                <p className="font-normal text-[14px] text-secondary-white text-center">What's New</p>
                                <div className='mt-[48px] flex flex-wrap justify-between gap-[24px]'>
                                    {newFeatures.map((feature, index) => (
                                        <div className='flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]'>
                                            <h1 className='mt-[26px] font-bold text-[24px] leading-[30px] text-white'>{feature.title}</h1>
                                            <p className='flex-1 mt-[16px] font-normal text-[18px] text-[#b0b0b0] leading-[32px]'>{feature.subtitle}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`flex-1 ${styles.flexCenter}`}>
                                <Image
                                    src="/buildings.svg"
                                    alt='buildings'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-[90%] h-[90%] object-contain'
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <section className={`${styles.paddings} relative z-10`}>
                    <div
                        className={`${styles.innerWidth} mx-auto flex flex-col`}
                    >
                        <p className="font-normal text-[14px] text-secondary-white text-center mt-24">Make it Safer</p>
                        <p className="font-normal text-[14px] text-secondary-white text-center">With a better Governance System</p>

                        <div
                            className='relative mt-[68px] flex w-full h-[550px]'
                        >
                            <Image
                                src="/map.png"
                                alt="map"
                                width={ 400 }
                                height={ 400 }
                                className='w-full h-full object-cover z-50'
                            />

                            <div className='absolute bottom-20 right-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]'>
                                <Image
                                    src='/people-default.jpg'
                                    alt='people'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-full h-full rounded-full'
                                />
                            </div>

                            <div className='absolute top-10 left-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]'>
                                <Image
                                    src='/people-default.jpg'
                                    alt='people'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-full h-full rounded-full'
                                />
                            </div>

                            <div className='absolute top-1/2 left-[45%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]'>
                                <Image
                                    src='/people-default.jpg'
                                    alt='people'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-full h-full rounded-full'
                                />
                            </div>

                            <div className='absolute top-1/2 right-40 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]'>
                                <Image
                                    src='/people-default.jpg'
                                    alt='people'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-full h-full rounded-full'
                                />
                            </div>

                            <div className='absolute bottom-40 left-40 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]'>
                                <Image
                                    src='/people-default.jpg'
                                    alt='people'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-full h-full rounded-full'
                                />
                            </div>

                            <div className='absolute left-1/2 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]'>
                                <Image
                                    src='/people-default.jpg'
                                    alt='people'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-full h-full rounded-full'
                                />
                            </div>

                            <div className='absolute bottom-1/2 left-3/4 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]'>
                                <Image
                                    src='/people-default.jpg'
                                    alt='people'
                                    width={ 16 }
                                    height={ 28 }
                                    className='w-full h-full rounded-full'
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <footer
                    className={`${styles.paddings} py-8 relative`}
                >
                    <div className='footer-gradient'/>

                    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
                        <div className='mt-24 flex items-center justify-between flex-wrap gap-5'>
                            <h4 className='font-bold md:text-[36px] text-[16px] text-white'>
                                The future needs you.
                            </h4>
                        </div>
                        <div className='flex flex-col'>
                            <div className='mb-[50px] h-[2px] bg-white opacity-10' />
                            <div className='flex items-center justify-between flex-wrap gap-4'>
                                <a href='https://github.com/renyanng/ethkl_privapoll'>
                                    <Image src="/privapoll.svg" alt="privapoll" width="100" height="50" />
                                </a>
                                <p className='font-normal text-[14px] text-white opacity-50'>
                                    All rights reserved.
                                </p>
                                <div className='flex gap-4'>
                                    {socials.map((social, index) => (
                                        <a href={social.website} target='_blank'>
                                            <Image
                                                key={social.name}
                                                src={social.url}
                                                alt={social.name}
                                                width={ 16 }
                                                height={ 28 }
                                                className='w-[24px] h-[24px] object-contain cursor-pointer'
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;