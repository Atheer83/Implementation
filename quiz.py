from cryptography.fernet import Fernet

key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='

# Oh no! The code is going over the edge! What are you going to do?
message = b'gAAAAABcy34TASh76SvOy3Z7u3XihQ99UQo5ZUyrKDKls0_zpmdzEXmW2YZnwe_xbSkIqfQxmGhHgxHzCug5jHOGTHh17qO3oWjWfWq3JKTo_KqayJ-rX03QPbiCmFUoNudVUurjz3zMRzZfFFl3e-AZlCXW4_8os7qAYb13NHZ9CE6AvGlU9AY7z2B7a3wyL0-5vv3DNXG-'

def main():
    f = Fernet(key)
    print(f.decrypt(message))


if __name__ == "__main__":
    main()