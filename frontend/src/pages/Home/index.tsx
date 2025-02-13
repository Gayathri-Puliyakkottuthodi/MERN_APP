import profile_pic from '@/assets/profile_pic.jpg';
import { COLORS, CONTACT, EXPERIENCES, PROJECTS } from '@/constants';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Card, Descriptions, Tag, Timeline, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const HomePage: React.FC = () => {
  return (
    <PageContainer title="My Resume" ghost>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Avatar size={100} src={profile_pic} />
          <Title level={2}>Gayathri Puliyakkottuthodi</Title>
          <Paragraph>
            Full-Stack Developer | React, MERN, MEAN, Python
          </Paragraph>
        </div>

        {/* Contact Information */}
        <Descriptions title="Contact Info" column={2} bordered>
          <Descriptions.Item label="Email">{CONTACT.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{CONTACT.phoneNo}</Descriptions.Item>
          <Descriptions.Item label="Location">
            {CONTACT.location}
          </Descriptions.Item>
          <Descriptions.Item label="Explore">
            <div style={{ gap: 3, display: 'flex' }}>
              <a href={CONTACT.linkedin} target="_blank">
                linkedin.com
              </a>
              ,
              <a href={CONTACT.github} target="_blank">
                github.com
              </a>
            </div>
          </Descriptions.Item>
        </Descriptions>

        {/* Skills */}
        <Card title="Skills" style={{ marginTop: 20 }}>
          {EXPERIENCES[0].technologies.map((tech) => (
            <Tag key={tech} color={getRandomColor()}>
              {tech}
            </Tag>
          ))}
        </Card>

        {/* Experience */}
        <Card title="Work Experience" style={{ marginTop: 20 }}>
          <Timeline>
            {EXPERIENCES.map((exp) => (
              <Timeline.Item color={getRandomColor()}>
                <strong>{`${exp.role} @ ${exp.company}`}</strong> ({exp.year})
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.description,
                  }}
                />
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        {/* Projects */}
        <Card title="Projects" style={{ marginTop: 20 }}>
          <Descriptions bordered column={1}>
            {PROJECTS.map((proj) => (
              <Descriptions.Item label={proj.title}>
                {proj.description}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Card>
      </Card>
    </PageContainer>
  );
};

export default HomePage;
